# npm registry audit service

<!-- 561-group-standards:badges:start -->
[![Red Cup Engineering](https://img.shields.io/badge/561%20Group-Red%20Cup%20Engineering-c0392b)](https://github.com/red-cup-engineering)
[![License: MIT](https://img.shields.io/badge/license-MIT-c0392b)](LICENSE)
[![Indigenous data: CARE](https://img.shields.io/badge/Indigenous%20data-CARE-4b6f44)](https://github.com/red-cup-engineering/.github/blob/main/GOVERNANCE.md)
[![Tips welcome](https://img.shields.io/badge/tips-welcome-d4a017)](https://github.com/561-group/.github/blob/main/TIPS.md)
<!-- 561-group-standards:badges:end -->

Runs the live-registry dependency audit that used to exist only as the root
Makefile's `registry-audit` target. That target hand-copied the registry's
internal-scope list (`REGISTRY_INTERNAL_SCOPES`) as a separate Make variable;
the copy drifted from Verdaccio's own `config.yaml` `packages:` block (which
is the actual access-control authority for those scopes), so a live,
populated scope declared only in storage — not in config.yaml — silently
audited as external and every internal dependency on it as unresolved.

`deriveInternalRegistryScopes` reads the scope list directly out of
`config.yaml` text instead, so there is exactly one place a scope is
declared. `runNpmRegistryAudit` takes an injected `fetchImplementation` (and,
for tests, injected graph functions) and derives the dependency graph, its
Graphviz DOT rendering, and the defect summary from one graph derivation
rather than three redundant registry round trips.

## Run it

```sh
node scripts/run-npm-registry-audit.mjs \
  --registry http://127.0.0.1:4873 \
  --config <path-to-verdaccio-services-section>/content/config/config.yaml \
  --out <path-to-repo-root>/data/records/npm-registry-audit
```

Exits non-zero when exact internal releases are unavailable or a published
manifest contains a local-only protocol such as `workspace:*`, unless
`--allow-defects` is passed. The summary reports separately when an internal
exact pin is published but is not the release selected by `dist-tags.latest`:
that is a latest-set convergence observation, not evidence that npm cannot
resolve the pin. This audit reads registry metadata; it does not claim to run
every package's full transitive installation. `--config` must point at the config.yaml the
running registry was actually started with — this tool audits against that
file's declared scopes, not a separately maintained list, precisely so it
cannot drift out of sync with the registry again.

## Acceptance

Run `npm test` for the source suite. See the [runnable consumer example](examples/quickstart.test.mjs).
