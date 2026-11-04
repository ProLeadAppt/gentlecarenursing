import test from "node:test";
import assert from "node:assert/strict";
import BlogOgImage from "../src/app/blog/[slug]/opengraph-image";
import AreaOgImage from "../src/app/areas/[region]/opengraph-image";
import ServiceRegionOgImage from "../src/app/services/[service]/[region]/opengraph-image";

test("all dynamic social-image templates render real PNGs with supported CSS", async () => {
  const cases = [
    ["blog", () => BlogOgImage({ params: Promise.resolve({ slug: "understanding-ndis-in-home-nursing" }) })],
    ["area", () => AreaOgImage({ params: Promise.resolve({ region: "inner-west" }) })],
    ["service-region", () => ServiceRegionOgImage({ params: Promise.resolve({ service: "ndis-services", region: "inner-west" }) })],
  ] as const;
  for (const [name, render] of cases) {
    const response = await render();
    assert.equal(response.status, 200, name);
    assert.match(response.headers.get("content-type") ?? "", /^image\/png/, name);
    const body = Buffer.from(await response.arrayBuffer());
    assert.deepEqual([...body.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10], name);
    assert.equal(body.readUInt32BE(16), 1200, name);
    assert.equal(body.readUInt32BE(20), 630, name);
  }
});
