# npm package install-resolution assay service

<!-- 561-group-standards:badges:start -->
[![Red Cup Engineering](https://img.shields.io/badge/561%20Group-Red%20Cup%20Engineering-c0392b)](https://github.com/red-cup-engineering)
[![License: MIT](https://img.shields.io/badge/license-MIT-c0392b)](LICENSE)
[![Indigenous data: CARE](https://img.shields.io/badge/Indigenous%20data-CARE-4b6f44)](https://github.com/red-cup-engineering/.github/blob/main/GOVERNANCE.md)
[![Tips welcome](https://img.shields.io/badge/tips-welcome-d4a017)](https://github.com/561-group/.github/blob/main/TIPS.md)
<!-- 561-group-standards:badges:end -->

This service tests one deliberately narrow claim: npm can resolve and install
selected exact package surfaces through a registry into isolated temporary
consumers. Every invocation passes `--ignore-scripts`; it does **not** prove
imports, runtime behavior, or lifecycle behavior.

It reports typed outcomes for unavailable targets, published local-only
protocols (`workspace:`, `file:`, `link:`), peer/engine resolution, tarball or
integrity failures, timeouts, and other resolution failures. Temporary
consumers are removed after every outcome.

```sh
printf '%s\n' '{"packageSurfaces":["@red-cup-engineering/example@1.0.0"]}' \
  | assay-npm-package-install-resolution
```

## Acceptance

Run `npm test` for the source suite. See the [runnable consumer example](examples/quickstart.test.mjs).
