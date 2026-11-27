import test from "node:test";
import assert from "node:assert/strict";
import {
  getLocalBusinessSchema,
  getServiceRegionSchemas,
} from "../src/lib/schema";

const canonicalEntityId = "https://gentlecarenursing.com.au/#organization";

test("local business schema is the single canonical organization entity", () => {
  const schema = getLocalBusinessSchema();

  assert.deepEqual(schema["@type"], ["Organization", "MedicalBusiness"]);
  assert.equal(schema["@id"], canonicalEntityId);
  assert.equal(schema.logo, "https://gentlecarenursing.com.au/images/logo.png");
});

test("GeoCoordinates contains coordinate values rather than postal address fields", () => {
  const schema = getLocalBusinessSchema();
  assert.deepEqual(schema.geo, {
    "@type": "GeoCoordinates",
    latitude: -33.864,
    longitude: 151.093,
  });
  assert.equal(schema.address.addressLocality, "North Strathfield");
  assert.equal(schema.address.addressRegion, "NSW");
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
