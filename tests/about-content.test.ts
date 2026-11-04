import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("About does not publish the explicitly placeholder team roster", () => {
  const page = readFileSync("src/app/about/page.tsx", "utf8");
  assert.doesNotMatch(page, /TEAM_MEMBERS|<TeamGrid/);
  assert.match(page, /<FounderStory/);
});

test("founder schema does not infer personal clinical qualifications", () => {
  const page = readFileSync("src/app/about/page.tsx", "utf8");
  assert.doesNotMatch(page, /knowsAbout:|Registered Nurse|Clinician-led/);
  const about = readFileSync("src/content/about.ts", "utf8");
  assert.doesNotMatch(about, /Through hands-on work across dementia care/);
  assert.match(about, /Led by a care team with strong hands-on experience in community care/);
});

test("DVA contracting is not described as DVA registration", () => {
  const services = readFileSync("src/app/services/page.tsx", "utf8");
  const socialImage = readFileSync("src/app/areas/[region]/opengraph-image.tsx", "utf8");
  const faq = readFileSync("src/content/faq.ts", "utf8");
  assert.doesNotMatch(services + socialImage + faq, /registered NDIS and DVA provider|Registered NDIS & DVA provider|all quality and safety benchmarks/);
  assert.match(services, /DVA Contracted Community Nursing Provider/);
});
