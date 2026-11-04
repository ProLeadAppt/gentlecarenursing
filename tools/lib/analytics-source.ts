import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

/** Binds runtime evidence to source/config, excluding approval records and secrets. */
export async function analyticsSourceDigest(root: string): Promise<string> {
  const files: string[] = [];
  async function visit(relative: string) {
    for (const item of await readdir(join(root, relative), { withFileTypes: true })) {
      const path = join(relative, item.name);
      if (item.isDirectory()) await visit(path);
      else if (item.isFile()) files.push(path);
    }
  }
  await visit("src");
  for (const item of await readdir(join(root, "public"), { withFileTypes: true })) {
    if (item.isFile() && item.name.endsWith(".js")) files.push(join("public", item.name));
  }
  files.push("package.json", "package-lock.json", "next.config.ts", "netlify.toml");
  const hash = createHash("sha256");
  for (const file of files.sort()) {
    hash.update(file); hash.update("\0"); hash.update(await readFile(join(root, file))); hash.update("\0");
  }
  return hash.digest("hex");
}
