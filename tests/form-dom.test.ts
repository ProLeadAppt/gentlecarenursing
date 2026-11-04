/** DOM simulation only: these tests do not establish real-browser dialog,
 * focus-trapping, layout, animation or mobile behavior. All delivery is mocked. */
import test from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";

const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'https://example.test' });
for (const key of ['window', 'self', 'document', 'HTMLElement', 'HTMLInputElement', 'HTMLSelectElement', 'HTMLTextAreaElement', 'HTMLAnchorElement', 'Element', 'Node', 'Event', 'MouseEvent', 'FormData', 'SVGElement']) {
  Object.defineProperty(globalThis, key, { configurable: true, value: (dom.window as unknown as Record<string, unknown>)[key] });
}
Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
const frames = new Map<number, FrameRequestCallback>();
let frameId = 0;
Object.assign(globalThis, {
  requestAnimationFrame: (callback: FrameRequestCallback) => { frames.set(++frameId, callback); return frameId; },
  cancelAnimationFrame: (id: number) => frames.delete(id),
});
// jsdom does not implement the native dialog API. This shim only checks the
// component lifecycle. Real browser focus trapping still needs release QA.
Object.assign(dom.window.HTMLDialogElement.prototype, {
  showModal(this: HTMLDialogElement) { this.open = true; }, close(this: HTMLDialogElement) { this.open = false; },
});
test('mocked DOM interaction regressions', async (suite) => {
const { createElement: h, act } = await import('react');
const { createRoot } = await import('react-dom/client');
const { ContactForm } = await import('../src/components/forms/ContactForm');
const { SimpleContactForm } = await import('../src/components/forms/SimpleContactForm');
const { ReferralForm } = await import('../src/components/forms/ReferralForm');
const { ReferralConcierge } = await import('../src/components/forms/ReferralConcierge');
const { FormModal } = await import('../src/components/ui/FormModal');
const { FormModalProvider, useFormModal } = await import('../src/contexts/FormModalContext');
const confirmed = () => Response.json({ success: true, submissionId: '8dd9d328-72ca-4a29-8022-735693bd84f7' });

async function mount(component: ReturnType<typeof h>) {
  const container = document.createElement('div'); document.body.append(container);
  const root = createRoot(container);
  await act(async () => root.render(component));
  return { container, cleanup: async () => { await act(async () => root.unmount()); container.remove(); } };
}
async function fill(container: HTMLElement, name: string, value: string) {
  const input = container.querySelector(`[name="${name}"]`) as HTMLInputElement;
  assert.ok(input, `Missing ${name}`);
  const prototype = input instanceof dom.window.HTMLSelectElement ? dom.window.HTMLSelectElement.prototype : input instanceof dom.window.HTMLTextAreaElement ? dom.window.HTMLTextAreaElement.prototype : dom.window.HTMLInputElement.prototype;
  await act(async () => {
    Object.getOwnPropertyDescriptor(prototype, 'value')!.set!.call(input, value);
    input.dispatchEvent(new dom.window.Event(input.tagName === 'SELECT' ? 'change' : 'input', { bubbles: true }));
  });
}
async function submit(container: HTMLElement) {
  await act(async () => container.querySelector('form')!.dispatchEvent(new dom.window.Event('submit', { bubbles: true, cancelable: true })));
}
async function click(button: HTMLElement) { await act(async () => button.click()); }

for (const [Form, fields] of [
  [ContactForm, { name: 'Synthetic Visitor', email: 'visitor@example.test', message: 'Synthetic enquiry' }],
  [SimpleContactForm, { name: 'Synthetic Visitor', email: 'visitor@example.test', phone: '0400000000', serviceType: 'Not sure yet', message: 'Synthetic enquiry' }],
  [ReferralForm, { referrerName: 'Synthetic Referrer', referrerPhone: '0400000000' }],
] as const) {
  await suite.test(`${Form.name}: invalid values never send, pending duplicates lock, failures preserve fields and can retry`, async () => {
    const view = await mount(h(Form));
    let calls = 0;
    let reject!: (error: Error) => void;
    globalThis.fetch = (() => { calls++; return new Promise<Response>((_, no) => { reject = no; }); }) as typeof fetch;
    try {
      await submit(view.container); assert.equal(calls, 0);
      for (const [name, value] of Object.entries(fields)) await fill(view.container, name, value);
      if ('email' in fields) {
        await fill(view.container, 'email', 'invalid'); await submit(view.container); assert.equal(calls, 0);
        await fill(view.container, 'email', 'visitor@example.test');
      }
      await submit(view.container); await submit(view.container); assert.equal(calls, 1);
      assert.equal((view.container.querySelector('[type="submit"]') as HTMLButtonElement).disabled, true);
      await act(async () => reject(new DOMException('Synthetic aborted request', 'AbortError')));
      assert.ok(view.container.querySelector('[role="alert"]'));
      assert.equal((view.container.querySelector('input') as HTMLInputElement).value, Object.values(fields)[0]);
      globalThis.fetch = (async () => { calls++; return confirmed(); }) as typeof fetch;
      await submit(view.container); assert.equal(calls, 2);
      assert.match(view.container.querySelector('[role="status"]')!.textContent!, /accepted for delivery/);
    } finally { await view.cleanup(); }
  });
}

await suite.test('concierge replaces required controls synchronously, validates every step, retains previous values and locks final submission', async () => {
  const view = await mount(h(ReferralConcierge)); let calls = 0; let resolve!: (response: Response) => void;
  globalThis.fetch = (() => { calls++; return new Promise<Response>(yes => { resolve = yes; }); }) as typeof fetch;
  try {
    await submit(view.container); assert.match(view.container.textContent!, /Step 1 of 4/);
    await fill(view.container, 'referrerName', 'Synthetic Referrer'); await fill(view.container, 'referrerRole', 'Family');
    await submit(view.container); assert.match(view.container.textContent!, /Step 2 of 4/);
    assert.equal(document.activeElement?.getAttribute('name'), 'referrerEmail');
    await submit(view.container); assert.match(view.container.textContent!, /Step 2 of 4/); assert.equal(calls, 0);
    await fill(view.container, 'referrerEmail', 'referrer@example.test'); await fill(view.container, 'referrerPhone', '0400000000');
    await submit(view.container); await submit(view.container); assert.match(view.container.textContent!, /Step 3 of 4/);
    await fill(view.container, 'serviceType', 'Other'); await submit(view.container); assert.match(view.container.textContent!, /Step 4 of 4/);
    const previous = [...view.container.querySelectorAll('button')].find(b => /Previous/.test(b.textContent!))!;
    await click(previous); assert.equal((view.container.querySelector('select') as HTMLSelectElement).value, 'Other');
    await submit(view.container); await submit(view.container); await submit(view.container); assert.equal(calls, 1);
    await click([...view.container.querySelectorAll('button')].find(b => /Previous/.test(b.textContent!))!);
    assert.match(view.container.textContent!, /Step 4 of 4/);
    await act(async () => resolve(confirmed())); assert.ok(view.container.querySelector('[role="status"]'));
  } finally { await view.cleanup(); }
});

function ModalHarness() {
  const { openModal } = useFormModal();
  return h('div', null, h('button', { id: 'trigger', onClick: () => openModal('contact') }, 'Open'), h(FormModal));
}
await suite.test('modal Escape and repeated close restore trigger focus, cancel pending autofocus and preserve prior body overflow', async () => {
  document.body.style.overflow = 'clip';
  const view = await mount(h(FormModalProvider, null, h(ModalHarness)));
  try {
    const trigger = view.container.querySelector('#trigger') as HTMLButtonElement;
    for (let i = 0; i < 3; i++) {
      const pendingFrames = new Set(frames.keys());
      trigger.focus(); await click(trigger);
      assert.equal(document.body.style.overflow, 'hidden');
      assert.equal(view.container.querySelector('dialog')!.open, true);
      await act(async () => { view.container.querySelector('dialog')!.dispatchEvent(new dom.window.Event('cancel', { cancelable: true })); });
      assert.equal(view.container.querySelector('dialog')!.open, false);
      assert.equal(document.activeElement, trigger);
      assert.equal(document.body.style.overflow, 'clip');
      assert.deepEqual(new Set(frames.keys()), pendingFrames);
    }
  } finally { await view.cleanup(); document.body.style.overflow = ''; }
});

await suite.test('mobile navigation closes on Escape and returns focus after opening the contact dialog', async () => {
  Object.assign(window, { matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }) });
  const { Nav } = await import('../src/components/layout/Nav');
  const { PathnameContext } = await import('next/dist/shared/lib/hooks-client-context.shared-runtime');
  const { CTA_LINKS } = await import('../src/lib/constants');
  const view = await mount(h(PathnameContext.Provider, { value: '/' }, h(FormModalProvider, null,
    h(Nav, { links: [{ href: '/about', label: 'About' }], cta: CTA_LINKS.requestCare }), h(FormModal))));
  try {
    const toggle = [...view.container.querySelectorAll('button')].find(b => b.textContent === 'Open menu')!;
    await click(toggle);
    const panel = document.getElementById(toggle.getAttribute('aria-controls')!)!;
    assert.equal(panel.hasAttribute('inert'), false);
    const link = panel.querySelector('a')!; link.focus();
    await act(async () => document.dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true })));
    assert.equal(toggle.getAttribute('aria-expanded'), 'false');
    assert.equal(document.activeElement, toggle);
    assert.equal(panel.hasAttribute('inert'), true);
    await click(toggle);
    const cta = [...panel.querySelectorAll('button')].find(b => b.textContent === 'Request Care')!;
    cta.focus(); await click(cta);
    assert.equal(toggle.getAttribute('aria-expanded'), 'false');
    assert.equal(view.container.querySelector('dialog')!.open, true);
    await click(view.container.querySelector('[aria-label="Close"]') as HTMLElement);
    assert.equal(document.activeElement, toggle);
  } finally { await view.cleanup(); }
});

await suite.test('inline contact page and modal retain unique IDs and correctly associated labels', async () => {
  const view = await mount(h(FormModalProvider, null, h(ContactForm), h(ModalHarness)));
  try {
    const trigger = view.container.querySelector('#trigger') as HTMLButtonElement;
    for (let i = 0; i < 2; i++) {
      await click(trigger);
      const dialog = view.container.querySelector('dialog')!;
      const ids = [...view.container.querySelectorAll('[id]')].map(element => element.id);
      assert.equal(new Set(ids).size, ids.length, 'Inline and modal IDs must not collide');
      for (const form of view.container.querySelectorAll('form')) {
        const labels = [...form.querySelectorAll('label[for]')] as HTMLLabelElement[];
        assert.equal(labels.length, 4);
        for (const label of labels) {
          assert.ok(label.control);
          assert.equal(label.control.closest('form'), form, 'Label must target its own form control');
        }
      }
      assert.equal(dialog.querySelectorAll('label[for]').length, 4);
      await click(dialog.querySelector('[aria-label="Close"]') as HTMLElement);
    }
  } finally { await view.cleanup(); }
});

await suite.test('private feedback rejects empty, malformed and unreadable receipts without losing input', async () => {
  const { ReviewFunnel } = await import('../src/components/review/ReviewFunnel');
  const view = await mount(h(ReviewFunnel));
  try {
    await click([...view.container.querySelectorAll('button')].find(button => /Share private feedback/.test(button.textContent!))!);
    await click(view.container.querySelector('[type="radio"][value="1"]') as HTMLElement);
    await click([...view.container.querySelectorAll('button')].find(button => /Continue with private feedback/.test(button.textContent!))!);
    await fill(view.container, 'name', 'Synthetic reviewer');
    await fill(view.container, 'improvements', 'Synthetic feedback fixture');
    for (const response of [
      Response.json({ success: true, submissionId: '' }),
      Response.json({ success: true, submissionId: 'not-a-uuid' }),
      Response.json(null),
      new Response('not JSON', { headers: { 'content-type': 'text/plain' } }),
      Response.json({ success: true, submissionId: '8dd9d328-72ca-4a29-8022-735693bd84f7' }, { status: 502 }),
    ]) {
      globalThis.fetch = (async () => response) as typeof fetch;
      await submit(view.container);
      assert.ok(view.container.querySelector('[role="alert"]'));
      assert.equal(view.container.querySelector('[role="status"]'), null);
      assert.equal((view.container.querySelector('[name="name"]') as HTMLInputElement).value, 'Synthetic reviewer');
      assert.equal((view.container.querySelector('[name="improvements"]') as HTMLTextAreaElement).value, 'Synthetic feedback fixture');
    }
    globalThis.fetch = (async () => Response.json({ error: 'untrusted response text must not be displayed' }, { status: 400 })) as typeof fetch;
    await submit(view.container);
    assert.match(view.container.querySelector('[role="alert"]')!.textContent!, /valid email address or phone number/);
    assert.doesNotMatch(view.container.textContent!, /untrusted response text/);
    assert.equal((view.container.querySelector('[name="name"]') as HTMLInputElement).value, 'Synthetic reviewer');
    globalThis.fetch = (async () => confirmed()) as typeof fetch;
    await submit(view.container);
    assert.match(view.container.querySelector('[role="status"]')!.textContent!, /accepted your private feedback for delivery/);
  } finally { await view.cleanup(); }
});

});
