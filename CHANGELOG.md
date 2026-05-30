# Changelog

## [0.1] — 2026-05-30

### Added

- Initial seed dataset across **10 federal defense-industrial-base authorities**:
  - DoD CIO (DFARS 252.204-7012 / -7019 / -7020 / -7021)
  - Cyber AB (CMMC C3PAO accreditation)
  - DIBCAC (DCMA-based CMMC L3 + NIST 800-171 high-confidence assessments)
  - DDTC (ITAR licensing, USML technical data)
  - BIS (EAR licensing, CCL, Entity List, deemed-export)
  - NIST (SP 800-171 / 172 catalogs, AI RMF + Generative AI Profile, SP 800-218A SSDF for AI)
  - GSA (FAR 52.204-21, GSA Schedule, FedRAMP joint authorization)
  - DCMA (Contractor Purchasing System Review, supplier surveillance)
  - DCSA (NISPOM 32 CFR 117, personnel + facility clearances, Continuous Vetting)
  - NARA-ISOO (CUI Executive Agent, E.O. 13556, CUI Registry, CUI Notice 2020-04)
- **8 distinct enforcement modes** encoded — most diverse of any state-tracker in the Suite, reflecting that federal-defense authorities do not share enforcement architecture.
- AI-specific position captured for all 10 authorities as of seed date.
- `validate.mjs` enforces required-field invariants + URL schema + array shape on `rulemaking_authority_basis` + `primary_obligations`.
- 7 unit tests across public API (`authorities`, `byId`, `byEnforcementMode`, `withAiSpecificPosition`, `summarize`).

### Not yet

- DCAA (Defense Contract Audit Agency) — overlaps DCMA in supplier oversight but distinct on cost-audit; deferred until DCAA publishes AI-specific cost-audit guidance.
- CDAO (Chief Digital and Artificial Intelligence Office) — published DoD Responsible AI Strategy but doesn't directly issue contractor obligations; tracked indirectly through DoD CIO entry.
- State-level National Guard / Reserve-component disclosure tracking — out of federal scope.
- Inter-authority dependency graph (e.g. "DDTC license required before BIS deemed-export evaluation").
- Per-authority recent-rulemaking changelog.
