import assert from "node:assert/strict";
import test from "node:test";
import { assayPackageInstallResolution } from "@red-cup-engineering/npm-package-install-resolution-assay-service";

test("INSTALL-RESOLUTION-QUICKSTART", async () => {
  const report = await assayPackageInstallResolution({
    packageSurfaces: ["@example/tool@1.0.0"],
    consumerFactory: async () => "/synthetic-consumer",
    cleanup: async () => {},
    installImplementation: async () => ({ ok: false, stderr: "npm error code ETARGET" }),
  });
  assert.equal(report.summary.attempted, 1);
  assert.equal(report.summary.failuresByCategory["target-version-unavailable"], 1);
});
