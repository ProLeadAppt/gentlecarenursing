import test from "node:test";
import assert from "node:assert/strict";
import {
  getLocalBusinessSchema,
  getServiceSchema,
  getMedicalProcedureSchema,
  getAreaPageSchema,
  getArticleSchema,
  getServiceRegionSchemas,
} from "../src/lib/schema";

const canonicalEntityId = "https://gentlecarenursing.com.au/#organization";

test("local business schema is the single canonical organization entity", () => {
  const schema = getLocalBusinessSchema();

  assert.deepEqual(schema["@type"], ["Organization", "MedicalBusiness"]);
  assert.equal(schema["@id"], canonicalEntityId);
  assert.equal(schema.logo, "https://gentlecarenursing.com.au/images/logo.png");
});

test("service-region schema references the canonical organization instead of duplicating it", () => {
  const [service, page] = getServiceRegionSchemas({
    serviceName: "NDIS Nursing",
    serviceDescription: "In-home support.",
    region: "Inner West",
    suburbs: ["Strathfield"],
    path: "/services/ndis-services/inner-west",
    pageTitle: "NDIS Nursing Inner West",
    pageDescription: "NDIS nursing in the Inner West.",
  });

  assert.ok("provider" in service);
  assert.ok("about" in page && "isPartOf" in page);
  assert.deepEqual(service.provider, { "@id": canonicalEntityId });
  assert.deepEqual(page.about, { "@id": canonicalEntityId });
  assert.deepEqual(page.isPartOf, {
    "@type": "WebSite",
    "@id": "https://gentlecarenursing.com.au/#website",
    url: "https://gentlecarenursing.com.au",
    name: "Gentle Care Nursing Services",
  });
});

test("service-region entities have stable reciprocal links and a typed service phone", () => {
  const [service, page] = getServiceRegionSchemas({
    serviceName: "Nursing", serviceDescription: "In-home care.", region: "Inner West",
    suburbs: ["Strathfield"], path: "/services/nursing-care/inner-west",
    pageTitle: "Nursing Inner West", pageDescription: "In-home care in the Inner West.",
  });
  assert.equal(service["@type"], "Service");
  assert.deepEqual(page.mainEntity, { "@id": service["@id"] });
  assert.deepEqual(service.mainEntityOfPage, { "@id": page["@id"] });
  assert.equal(service.availableChannel.servicePhone["@type"], "ContactPoint");
  assert.ok(service.availableChannel.servicePhone.telephone);
});

test("business schema does not invent coordinates, office hours, pricing or nationwide coverage", () => {
  const schema = getLocalBusinessSchema();
  assert.equal("geo" in schema, false);
  assert.equal("openingHoursSpecification" in schema, false);
  assert.equal("priceRange" in schema, false);
  assert.ok(schema.areaServed.every((area) => area["@type"] === "City" || area["@type"] === "Place"));
  assert.ok(schema.sameAs?.every((url) => !url.endsWith("/review")));
});

test("service review and modification metadata belongs to the linked page", () => {
  const service = getServiceSchema({
    name: "Nursing", description: "In-home care.", url: "/services/nursing-care",
    dateModified: "2026-01-02", reviewedBy: { name: "Example reviewer", role: "Reviewer" },
    areaServed: { "@type": "City", name: "Sydney" },
  });
  assert.equal(service["@type"], "Service");
  assert.equal("dateModified" in service, false);
  assert.equal("reviewedBy" in service, false);
  assert.equal(service.mainEntityOfPage.dateModified, "2026-01-02");
  assert.equal(service.mainEntityOfPage.reviewedBy?.name, "Example reviewer");
  assert.deepEqual(service.mainEntityOfPage.mainEntity, { "@id": service["@id"] });
  assert.deepEqual(service.provider, { "@id": canonicalEntityId });
});

test("service helper accepts absolute URLs and does not invent review information", () => {
  const service = getServiceSchema({ name: "Care", description: "Care.", url: "https://gentlecarenursing.com.au/suburbs/burwood" });
  assert.equal(service.url, "https://gentlecarenursing.com.au/suburbs/burwood");
  assert.equal("reviewedBy" in service.mainEntityOfPage, false);
  assert.equal("dateModified" in service.mainEntityOfPage, false);
});

test("medical procedures link to their describing page without unsupported provider", () => {
  const procedure = getMedicalProcedureSchema({ name: "Wound care", pageUrl: "/services/nursing-care" });
  assert.equal(procedure["@type"], "MedicalProcedure");
  assert.equal("provider" in procedure, false);
  assert.equal("relevantSpecialty" in procedure, false);
  assert.equal(procedure.subjectOf["@id"], "https://gentlecarenursing.com.au/services/nursing-care#webpage");
});

test("area pages and articles reuse the canonical organization", () => {
  const page = getAreaPageSchema("Inner West", "/areas/inner-west", "Local care.");
  assert.deepEqual(page.about, { "@id": canonicalEntityId });
  assert.deepEqual(page.spatialCoverage, { "@type": "Place", name: "Inner West" });
  const article = getArticleSchema({ title: "Care", excerpt: "Care.", publishedAt: "2026-01-01", author: { name: "Example author" }, url: "https://gentlecarenursing.com.au/blog/care" });
  assert.deepEqual(article.publisher, { "@id": canonicalEntityId });
  const organizationArticle = getArticleSchema({ title: "Care", excerpt: "Care.", publishedAt: "2026-01-01", author: { name: "Gentle Care Nursing Services", role: "Clinical Team" }, url: "https://gentlecarenursing.com.au/blog/care" });
  assert.deepEqual(organizationArticle.author, { "@id": canonicalEntityId });
});

test("every configured service, condition and region uses linked standard Service nodes", async () => {
  const serviceContent = await import("../src/content/services");
  const { CONDITIONS } = await import("../src/content/conditions");
  const { SERVICE_REGION_PAGES } = await import("../src/content/service-regions");
  const { SUBURBS } = await import("../src/content/suburbs");
  const pages = Object.entries(serviceContent)
    .filter(([key]) => key.endsWith("_PAGE"))
    .map(([, value]) => value as typeof serviceContent.NDIS_PAGE);
  pages.push(...CONDITIONS.map((condition) => condition.data));
  const ids = new Set<string>();
  for (const page of pages) {
    assert.ok(page.href, `${page.title} has a stable canonical path`);
    const schema = getServiceSchema({ name: page.title, description: page.intro, url: page.href! });
    assert.equal(schema["@type"], "Service");
    assert.equal(ids.has(schema["@id"]), false, schema["@id"]);
    ids.add(schema["@id"]);
  }
  for (const page of SERVICE_REGION_PAGES) {
    const [service, webPage] = getServiceRegionSchemas({
      serviceName: page.service.title,
      serviceDescription: page.service.schemaDescription.replace(/\{region\}/g, page.region.region),
      region: page.region.region, suburbs: page.region.suburbs,
      path: page.path, pageTitle: page.metaTitle, pageDescription: page.metaDescription,
    });
    assert.equal(service["@type"], "Service");
    assert.deepEqual(webPage.mainEntity, { "@id": service["@id"] });
    assert.equal(ids.has(service["@id"]), false, service["@id"]);
    ids.add(service["@id"]);
  }
  for (const suburb of SUBURBS) {
    const schema = getServiceSchema({ name: suburb.name, description: "In-home nursing.", url: `/suburbs/${suburb.slug}` });
    assert.equal(schema["@type"], "Service");
    assert.equal(ids.has(schema["@id"]), false, schema["@id"]);
    ids.add(schema["@id"]);
  }
  assert.equal(ids.size, pages.length + SERVICE_REGION_PAGES.length + SUBURBS.length);
});
