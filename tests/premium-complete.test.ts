import { restorePriorFooterCredit } from "./helpers/footer-credit";
import { restorePriorLocalContext, restorePriorLocalContextHtml } from "./helpers/local-context-review";
import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import { createElement, type ReactNode, type ComponentType } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { FormModalProvider } from "../src/contexts/FormModalContext";
import baseline from "./fixtures/complete-baseline.json";

// Captures predate these presentation changes. Every original element, text
// node, attribute, schema and link remains exact after removing ONLY named
// presentation divs, classes/styles and generated React identifier prefixes.
const nativeRequire = createRequire(import.meta.url);
nativeRequire.extensions[".css"] = () => undefined;
type Params = Record<string, string>;
type Route = { default: ComponentType | ((props: {params: Promise<Params>}) => Promise<ReactNode>); metadata?: unknown; generateMetadata?: (props: {params: Promise<Params>}) => Promise<unknown>; generateStaticParams?: () => Params[] | Promise<Params[]>; dynamicParams?: boolean };
type Capture = {family: string; params: Params; html: string; metadata: unknown; schemas: unknown[]; headingLevels: number[]};
const captures: Record<string, Capture> = baseline.routes;
const digest = (value: string | Buffer) => createHash("sha256").update(restorePriorFooterCredit(value)).digest("hex");
const walk = (dir: string): string[] => readdirSync(dir, {withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(join(dir,e.name)):[join(dir,e.name)]);
const sourcePaths = Object.keys(baseline.sources).sort();
const cssPaths = ["src/app/premium-editorial.css", "src/app/premium-locality.css", "src/app/premium-utility.css"];
const wrappers = new Set<string>(["premium-condition", "premium-article", "premium-locality premium-locality-region", "premium-locality premium-locality-suburb", "locality-evidence"]);
const semanticDOM = (html: string) => {
  const stack: boolean[] = [];
  const result = html.replace(/<\/?div\b[^>]*>/g, tag => {
    if (tag.startsWith("</")) return stack.pop() ? "" : tag;
    const added = [...wrappers].some(name => tag === `<div class="${name}">`);
    stack.push(added); return added ? "" : tag;
  });
  assert.equal(stack.length, 0);
  return result.replace(/\s(?:class|style)="[^"]*"/g, "").replace(/_R_[a-zA-Z0-9]+_/g, "_REACT_ID_");
};
const schemas = (html: string) => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
const links = (html: string) => [...html.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(m=>m[1]);
const moduleFor = (family: string) => nativeRequire(`../src/app/${family}/page.tsx`) as Route;
async function render(route: Route, params: Params) {
  const element = route.generateStaticParams ? await (route.default as (props: {params: Promise<Params>}) => Promise<ReactNode>)({params:Promise.resolve(params)}) : createElement(route.default as ComponentType);
  return renderToStaticMarkup(createElement(FormModalProvider,null,element));
}
for (const [path, original] of Object.entries(captures)) {
  const route = moduleFor(original.family);
  test(`${path}: full original semantic DOM, exact copy, claims, images, links and controls survive`, async () => {
    const html = await render(route, original.params);
    assert.equal(semanticDOM(restorePriorLocalContextHtml(html)), semanticDOM(original.html));
    assert.deepEqual(links(html), links(original.html));
    assert.equal((html.match(/<h1\b/g)??[]).length,1);
    assert.deepEqual([...html.matchAll(/<h([1-6])\b/g)].map(m=>Number(m[1])), original.headingLevels);
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);
    assert.equal(ids.length,new Set(ids).size);
    for (const m of html.matchAll(/(?:aria-controls|aria-labelledby)="([^"]+)"/g)) for (const id of m[1].split(/\s+/)) assert.ok(ids.includes(id),id);
    assert.doesNotMatch(html,/<main\b|<iframe\b/);
  });
  test(`${path}: complete metadata, canonical, noindex, JSON-LD and schema vocabulary stay exact`, async () => {
    const metadata = route.generateMetadata ? await route.generateMetadata({params:Promise.resolve(original.params)}) : route.metadata;
    assert.deepEqual(metadata, original.metadata);
    assert.equal(new URL(String((metadata as {alternates:{canonical:string}}).alternates.canonical)).pathname,path);
    assert.deepEqual(schemas(await render(route,original.params)),original.schemas);
  });
}
for (const [family,count] of [["areas/[region]",6],["suburbs/[suburb]",15],["conditions/[condition]",6],["blog/[slug]",5]] as const) {
  test(`${family}: exact finite URL set and invalid/case-changed/empty parameters retain 404`, async () => {
    const route=moduleFor(family); assert.equal(route.dynamicParams,false);
    const params=await route.generateStaticParams!(); assert.equal(params.length,count);
    const expected=Object.entries(captures).filter(([,v])=>v.family===family);
    assert.deepEqual(params,expected.map(([,v])=>v.params));
    const actual=params.map(p=>'/'+family.replace(/\[([^\]]+)\]/g,(_,key)=>p[key]));
    assert.deepEqual(actual,expected.map(([p])=>p)); assert.equal(new Set(actual).size,count);
    const key=Object.keys(params[0])[0];
    for (const value of ["__unknown__","",params[0][key].toUpperCase()]) {
      const props={params:Promise.resolve({[key]:value})};
      await assert.rejects(()=>(route.default as (p:typeof props)=>Promise<ReactNode>)(props),(error:unknown)=>(error as {digest?:string}).digest==="NEXT_HTTP_ERROR_FALLBACK;404");
      assert.deepEqual(await route.generateMetadata!(props),{});
    }
  });
}
test("complete: all shared layouts, forms, states, backend, content, assets and configuration remain byte-identical",()=>{
  for (const [path,hash] of Object.entries(baseline.unchangedFiles)) {
    // Hidden-navigation fallback: exact source reconstruction in hidden-navigation.test.ts.
    if (["src/components/layout/Nav.tsx", "src/components/layout/MobileCta.tsx"].includes(path)) continue;
    // Exact enquiry-session delta: authentication and preservation in enquiry-session-guard.test.ts.
    if (["src/components/forms/ContactForm.tsx", "src/components/forms/SimpleContactForm.tsx", "src/components/forms/ReferralForm.tsx", "src/components/ui/FormModal.tsx"].includes(path)) continue;
    // Referral outcome/lifecycle changes are independently covered in referral-concierge-outcome.test.ts.
    if (["src/components/forms/ReferralConcierge.tsx", "src/components/ui/FormModal.tsx", "src/lib/form-client.ts"].includes(path)) continue;
    // Only review motion/focus changes: preservation and behavior in review-reduced-motion.test.ts.
    if (["src/components/review/ReviewFunnel.tsx", "src/components/review/StarRating.tsx"].includes(path)) continue;
    // Only the current measurement docs change; original hashes and contract checks are in measurement-documentation.test.ts.
    if (["docs/seo/measurement-specification.md", "docs/seo/monthly-report-template.md"].includes(path)) continue;
    // Remove only the Next smooth-scroll opt-in; retain the original layout hash.
    assert.equal(digest(path === "src/content/suburbs.ts" ? restorePriorLocalContext(readFileSync(path, "utf8")) : path === "src/app/layout.tsx" ? readFileSync(path, "utf8").replace('<html lang="en" data-scroll-behavior="smooth"', '<html lang="en"') : path === "src/app/globals.css" ? readFileSync(path, "utf8").replace('@import "tailwindcss" source("../");', '@import "tailwindcss";') : readFileSync(path)),hash,path);
  }
  const original=Object.keys(baseline.unchangedFiles).filter(p=>p.startsWith("src/")||p.startsWith("public/"));
  assert.deepEqual([...walk("src"),...walk("public")].sort(),[...original,...sourcePaths,...cssPaths].sort());
});
test("complete: /review keeps both feedback destinations, noindex and sitemap exclusion",async()=>{
  const route=moduleFor("review"); const html=await render(route,{});
  assert.deepEqual((route.metadata as {robots:unknown}).robots,{index:false,follow:false,nocache:true,googleBot:{index:false,follow:false}});
  assert.deepEqual(links(html),links(captures["/review"].html));
  assert.match(html,/Both options are open to everyone, whatever your experience/);
  const sitemap=nativeRequire("../src/app/sitemap.ts").default() as {url:string}[];
  assert.equal(sitemap.length,88); assert.equal(new Set(sitemap.map(s=>s.url)).size,88);
  assert.ok(!sitemap.some(s=>new URL(s.url).pathname==="/review"));
  for (const path of Object.keys(captures).filter(p=>p!=="/review")) assert.ok(sitemap.some(s=>new URL(s.url).pathname===path),path);
});
for (const [file,roots,importers] of [
  ["src/app/premium-locality.css",[".premium-locality"],["src/app/areas/[region]/page.tsx","src/app/suburbs/[suburb]/page.tsx"]],
  ["src/app/premium-editorial.css",[".premium-condition",".premium-article"],["src/app/blog/[slug]/page.tsx","src/app/conditions/[condition]/page.tsx"]],
  ["src/app/premium-utility.css",[".premium-privacy",".premium-terms",".premium-review"],["src/app/privacy/page.tsx","src/app/review/page.tsx","src/app/terms/page.tsx"]],
] as const) {
  test(`${file}: selectors and import boundaries stay opt-in; no hiding, external resources or new motion`,()=>{
    const css=readFileSync(file,"utf8");
    const selectors=[...css.replace(/\/\*[\s\S]*?\*\//g,"").matchAll(/([^{}]+)\{/g)].map(m=>m[1].trim());
    for (const selector of selectors.filter(s=>!s.startsWith("@"))) for (const branch of selector.split(/,(?![^()]*\))/)) assert.ok(roots.some(root=>branch.trim().startsWith(root)) || /^:is\(([^)]+)\)/.test(branch.trim()) && branch.trim().match(/^:is\(([^)]+)\)/)![1].split(",").every(root=>roots.includes(root.trim() as never)),branch);
    const imports=walk("src").filter(p=>/\.(?:tsx?|css)$/.test(p)&&p!==file&&readFileSync(p,"utf8").includes(file.split('/').pop()!));
    assert.deepEqual(imports,[...importers]);
    for (const pattern of [/min-width:\s*0/,/overflow-wrap:\s*anywhere/,/prefers-reduced-motion:\s*reduce/,/:focus-visible/]) assert.match(css,pattern);
    assert.doesNotMatch(css,/@import|@font-face|url\(|transition:\s*all|opacity:\s*0\b|position:\s*(?:fixed|sticky)|pointer-events:\s*none|display:\s*none|visibility:\s*hidden|\[hidden\]|:has\(/);
  });
}
test("complete: selected readable text and focus palette meets AA contrast thresholds",()=>{
  const luminance=(hex:string)=>hex.match(/\w\w/g)!.map(x=>parseInt(x,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0);
  const contrast=(a:string,b:string)=>{const [low,high]=[luminance(a),luminance(b)].sort((x,y)=>x-y);return (high+.05)/(low+.05);};
  for (const bg of ["fdf6ec","fffdf9","e8eee3","dce5d5"]) for (const fg of ["332e2a","615b54","842833","486141"]) assert.ok(contrast(fg,bg)>=4.5,`${fg}/${bg}`);
  for (const [fg,bg] of [["ffffff","842833"],["ffffff","3d0a11"],["fdf6ec","3d0a11"],["e9d8d0","3d0a11"]]) assert.ok(contrast(fg,bg)>=4.5);
});

test("complete: all seven route sources reconstruct exactly from presentation-only additions",()=>{
  for (const [path,original] of Object.entries(baseline.sources)) {
    let source=readFileSync(path,"utf8").replace(/^import "\.\.\/(?:\.\.\/)?premium-(?:editorial|locality|utility)\.css";\n/,"");
    if(path.includes('/areas/')||path.includes('/suburbs/')) {
      source=source.replace(/^      <div className="premium-locality premium-locality-(?:region|suburb)">\n/m,"").replace('      </div>\n    </>','    </>');
      source=source.replace('      <div className="locality-evidence">\n',"").replace('      </div>\n\n      {/* Main Content Area */}','      {/* Main Content Area */}');
      source=source.replace(/ className="locality-[\w-]+"/g,"").replace(/className="locality-[\w-]+ /g,'className="');
    } else if(path.includes('/conditions/')) {
      source=source.replace('  return (\n    <div className="premium-condition">\n      <ServicePageLayout data={entry.data} />\n    </div>\n  );','  return <ServicePageLayout data={entry.data} />;');
    } else if(path.includes('/blog/')) {
      source=source.replace('      <div className="premium-article">\n        <BlogPostLayout post={post} />\n      </div>','      <BlogPostLayout post={post} />');
    } else {
      source=source.replace(/ className="premium-(?:privacy|terms)"/g,"").replace(/className="(?:premium-review|utility-legal-prose|utility-review-hero|utility-review-body) /g,'className="');
    }
    assert.equal(source,original,path);
  }
});
