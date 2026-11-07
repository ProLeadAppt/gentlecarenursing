import test from "node:test";
import assert from "node:assert/strict";
import { getServiceSchema, getServiceRegionSchemas, getArticleSchema } from "../src/lib/schema";
import { getAllServiceRegionParams, getServiceRegionPage } from "../src/content/service-regions";

const origin = "https://gentlecarenursing.com.au";
test("service uses documented vocabulary and puts editorial metadata on its page", () => {
  const schema = getServiceSchema({ name: "Nursing", description: "Care at home", url: "/services/nursing", dateModified: "2026-10-01", reviewedBy: {name: "Test reviewer", role: "Test role"}, areaServed: {"@type":"Place", name:"Sydney"} });
  assert.equal(schema["@type"], "Service");
  assert.equal(schema.url, `${origin}/services/nursing`);
  assert.deepEqual(schema.provider, {"@id":`${origin}/#organization`});
  assert.ok(!("dateModified" in schema));
  assert.ok(!("reviewedBy" in schema));
  assert.equal(schema.mainEntityOfPage["@type"], "WebPage");
  assert.equal(schema.mainEntityOfPage.dateModified, "2026-10-01");
  assert.equal(schema.mainEntityOfPage.reviewedBy?.name, "Test reviewer");
  assert.deepEqual(schema.areaServed, {"@type":"Place", name:"Sydney"});
});
test("service does not invent editorial metadata when absent", () => {
  const page = getServiceSchema({name:"Nursing", description:"Care", url:"/services/nursing"}).mainEntityOfPage;
  assert.ok(!("dateModified" in page));
  assert.ok(!("reviewedBy" in page));
});
test("all service-region variants preserve content and use ContactPoint for servicePhone", () => {
  const params = getAllServiceRegionParams();
  assert.equal(params.length, 30);
  for (const {service, region} of params) {
    const page = getServiceRegionPage(service, region)!;
    const [schema, webpage] = getServiceRegionSchemas({serviceName:page.service.title,serviceDescription:page.service.schemaDescription.replace(/\{region\}/g,page.region.region),region:page.region.region,suburbs:page.region.suburbs,path:page.path,pageTitle:page.metaTitle,pageDescription:page.metaDescription});
    assert.equal(schema["@type"],"Service");
    assert.ok("availableChannel" in schema);
    assert.equal(schema.availableChannel.servicePhone["@type"],"ContactPoint");
    assert.equal(typeof schema.availableChannel.servicePhone.telephone,"string");
    assert.equal(schema.url, `${origin}${page.path}`);
    assert.equal(webpage.url,schema.url);
    assert.deepEqual(schema.provider,{"@id":`${origin}/#organization`});
    assert.equal(schema.areaServed.length,page.region.suburbs.length+1);
  }
});


test("article author keeps person compatibility and supports an organization without a job title", () => {
  const post = {title: "Example", excerpt: "Example text", publishedAt: "2026-10-01", url: `${origin}/blog/example`};
  const person = getArticleSchema({...post, author: {name:"Example person", role:"Writer"}});
  assert.deepEqual(person.author, {"@type":"Person", name:"Example person", jobTitle:"Writer"});
  const organization = getArticleSchema({...post, author: {name:"Example organization", type:"Organization", role:"Not a person's role"}});
  assert.deepEqual(organization.author, {"@type":"Organization", name:"Example organization"});
  assert.equal(organization.dateModified, post.publishedAt);
  assert.equal(organization.mainEntityOfPage["@id"], post.url);
});
