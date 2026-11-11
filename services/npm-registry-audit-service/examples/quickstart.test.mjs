import assert from "node:assert/strict";
import test from "node:test";
import { fetchNpmRegistryCatalog } from "@red-cup-engineering/npm-registry-audit-service";

test("REGISTRY-AUDIT-QUICKSTART", async () => {
  const names = await fetchNpmRegistryCatalog({
    registryUrl: "https://registry.example",
    fetchImplementation: async () => Response.json([{ name: "z" }, { name: "a" }, { name: "a" }]),
  });
  assert.deepEqual(names, ["a", "z"]);
});
