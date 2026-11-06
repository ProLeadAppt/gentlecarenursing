/** Owns only one dialog opening's scroll lock and scheduled autofocus. */
export function beginModalSession({
  dialog,
  bodyStyle,
  focusFirst,
  requestFrame,
  cancelFrame,
}: {
  dialog: Pick<HTMLDialogElement, "open" | "isConnected" | "showModal">;
  bodyStyle: Pick<CSSStyleDeclaration, "overflow">;
  focusFirst: () => void;
  requestFrame: (callback: FrameRequestCallback) => number;
  cancelFrame: (id: number) => void;
}): () => void {
  if (!dialog.open) dialog.showModal();
  const previousOverflow = bodyStyle.overflow;
  bodyStyle.overflow = "hidden";
  let active = true;
  const frame = requestFrame(() => {
    if (active && dialog.open && dialog.isConnected) focusFirst();
  });

  return () => {
    if (!active) return;
    active = false;
    cancelFrame(frame);
    bodyStyle.overflow = previousOverflow;
  };
}
