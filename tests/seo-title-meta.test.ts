import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { SERVICE_REGION_PAGES } from "../src/content/service-regions";

const nativeRequire = createRequire(import.meta.url);
nativeRequire.extensions[".css"] = () => undefined;

const LONG_DASH = /[—–]/;
const ELLIPSIS = /\.{3}|…/;
const DOUBLE_BRAND = /\| Gentle Care \| Gentle Care/;

type Meta = {
  title?: string | { absolute?: string };
  description?: string;
  openGraph?: { title?: string; description?: string };
  twitter?: { title?: string; description?: string };
};

function titleText(title: Meta["title"]): string {
  if (typeof title === "string") return title;
  return title?.absolute ?? "";
}

function assertMeta(label: string, title: string, description: string) {
  assert.ok(title.length > 0 && title.length <= 60, `${label} title length ${title.length}: ${title}`);
  assert.ok(description.length > 0 && description.length <= 155, `${label} description length ${description.length}: ${description}`);
  assert.doesNotMatch(title, LONG_DASH, label);
  assert.doesNotMatch(description, LONG_DASH, label);
  assert.doesNotMatch(title, ELLIPSIS, label);
  assert.doesNotMatch(description, ELLIPSIS, label);
  assert.doesNotMatch(title, DOUBLE_BRAND, label);
  assert.doesNotMatch(description, /\. experienced/, label);
}

const REGION_COPY: Record<string, { title: string; description: string }> = {
  "in-home-nursing-care": {
    title: "In-Home Nursing {region} | Gentle Care",
    description: "In-home nursing care across {region}, delivered by experienced nurses with calm, clear communication. Call 1300 004 267 to enquire.",
  },
  "dva-community-nursing": {
    title: "DVA Community Nursing {region} | Gentle Care",
    description: "DVA Community Nursing across {region} for eligible Veteran Card holders. Call 1300 004 267 to discuss a referral.",
  },
  "ndis-services": {
    title: "NDIS Nursing & Support {region} | Gentle Care",
    description: "Registered NDIS in-home nursing and personal support across {region}. Talk with our team on 1300 004 267 to discuss your NDIS plan.",
  },
  "complex-care-support": {
    title: "Complex Care {region} | Gentle Care",
    description: "In-home complex care and high-intensity nursing support across {region}. Contact Gentle Care on 1300 004 267 to discuss your needs.",
  },
  "personal-care-daily-living": {
    title: "Personal Care {region} | Gentle Care",
    description: "In-home personal care and daily living support across {region}, tailored to your routine. Call 1300 004 267 to enquire.",
  },
};

assert.equal(SERVICE_REGION_PAGES.length, 30);

for (const page of SERVICE_REGION_PAGES) {
  const pattern = REGION_COPY[page.serviceSlug];
  const title = pattern.title.replaceAll("{region}", page.region.region);
  const description = pattern.description.replaceAll("{region}", page.region.region);
  test(`${page.path}: service-region title and meta stay within limits`, () => {
    assert.equal(page.metaTitle, title);
    assert.equal(page.metaDescription, description);
    assertMeta(page.path, page.metaTitle, page.metaDescription);
    assert.doesNotMatch(page.metaDescription, /, Sydney\./);
  });
}

const CORE: Record<string, { title: string; description: string; loader: () => Meta | Promise<Meta> }> = {
  "/": {
    title: "Gentle Care Nursing Services | In-Home Nursing Sydney",
    description: "Personalised in-home nursing, personal care, and support across Sydney for NDIS, DVA, Aged Care, and private clients. Call 1300 004 267.",
    loader: () => nativeRequire("../src/app/page.tsx").metadata,
  },
  "/services/nursing-care": {
    title: "Clinical Nursing at Home Sydney | Gentle Care",
    description: "In-home clinical nursing across Sydney for wound care, medication support, and health monitoring, delivered with dignity and clear communication.",
    loader: () => nativeRequire("../src/app/services/nursing-care/page.tsx").metadata,
  },
  "/dva": {
    title: "DVA Community Nursing Sydney | Gentle Care",
    description: "DVA Contracted Community Nursing Provider in Sydney supporting eligible Veteran Card holders at home with nursing, wound care, and daily support.",
    loader: () => nativeRequire("../src/app/dva/page.tsx").metadata,
  },
  "/ndis": {
    title: "Registered NDIS Provider Sydney | Gentle Care",
    description: "Registered NDIS provider across Sydney for in-home nursing, daily personal care, community access, and high-intensity supports tailored to your plan.",
    loader: () => nativeRequire("../src/app/ndis/page.tsx").metadata,
  },
  "/aged-care": {
    title: "Aged Care at Home Sydney | Gentle Care Nursing",
    description: "In-home aged care across Sydney for personal care, nursing, companionship, and post-hospital recovery. Call 1300 004 267 to discuss your options.",
    loader: () => nativeRequire("../src/app/aged-care/page.tsx").metadata,
  },
  "/private-nursing": {
    title: "Private In-Home Nursing Sydney | Gentle Care",
    description: "Self-funded in-home nursing and personal care across Sydney for recovery, respite, or ongoing support. Call 1300 004 267 to discuss your needs.",
    loader: () => nativeRequire("../src/app/private-nursing/page.tsx").metadata,
  },
  "/services/post-hospital-care": {
    title: "Post-Hospital Care at Home Sydney | Gentle Care",
    description: "Post-hospital nursing and personal care at home in Sydney. We work with your discharge plan to support a steady recovery. Call 1300 004 267.",
    loader: () => nativeRequire("../src/app/services/post-hospital-care/page.tsx").metadata,
  },
  "/services/overnight-support": {
    title: "Overnight Support at Home Sydney | Gentle Care",
    description: "Active overnight and sleepover care at home across Sydney for NDIS and aged care clients. Call 1300 004 267 to discuss support options.",
    loader: () => nativeRequire("../src/app/services/overnight-support/page.tsx").metadata,
  },
  "/areas/south-sydney": {
    title: "In-Home Nursing South Sydney | Gentle Care",
    description: "In-home nursing and personal care in South Sydney from a Registered NDIS and DVA Contracted Community Nursing Provider. Call 1300 004 267.",
    loader: () => nativeRequire("../src/app/areas/[region]/page.tsx").generateMetadata({ params: Promise.resolve({ region: "south-sydney" }) }),
  },
  "/areas/inner-west": {
    title: "In-Home Nursing Inner West Sydney | Gentle Care",
    description: "In-home nursing and personal care across Sydney's Inner West from our North Strathfield team. NDIS registered and DVA contracted. Call 1300 004 267.",
    loader: () => nativeRequire("../src/app/areas/[region]/page.tsx").generateMetadata({ params: Promise.resolve({ region: "inner-west" }) }),
  },
  "/contact": {
    title: "Contact Gentle Care Nursing Services | Sydney",
    description: "Contact our North Strathfield office Mon to Fri 8am to 5pm, or call 1300 004 267 to enquire about in-home nursing across Sydney.",
    loader: () => nativeRequire("../src/app/contact/page.tsx").metadata,
  },
};

for (const [path, expected] of Object.entries(CORE)) {
  test(`${path}: absolute title and meta description`, async () => {
    const metadata = await expected.loader();
    assert.deepEqual(metadata.title, { absolute: expected.title });
    assert.equal(metadata.description, expected.description);
    assert.equal(metadata.openGraph?.title, expected.title);
    assert.equal(metadata.twitter?.title, expected.title);
    assert.equal(metadata.openGraph?.description, expected.description);
    assert.equal(metadata.twitter?.description, expected.description);
    assertMeta(path, expected.title, expected.description);
  });
}

const regionRoute = nativeRequire("../src/app/services/[service]/[region]/page.tsx") as {
  generateMetadata: (props: { params: Promise<{ service: string; region: string }> }) => Promise<Meta>;
};

for (const page of SERVICE_REGION_PAGES) {
  test(`${page.path}: rendered metadata uses an absolute title`, async () => {
    const metadata = await regionRoute.generateMetadata({
      params: Promise.resolve({ service: page.serviceSlug, region: page.regionSlug }),
    });
    assert.deepEqual(metadata.title, { absolute: page.metaTitle });
    assert.equal(metadata.description, page.metaDescription);
    assert.equal(metadata.openGraph?.title, page.metaTitle);
    assert.equal(metadata.twitter?.title, page.metaTitle);
    assertMeta(page.path, titleText(metadata.title), metadata.description ?? "");
  });
}
