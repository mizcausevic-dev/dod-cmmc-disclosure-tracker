# dod-cmmc-disclosure-tracker

> **DefenseTech state-tracker (Spec #2 of the DefenseTech 6-pack).** Lifecycle snapshot of the 10 federal authorities that regulate defense-industrial-base AI / cybersecurity / export-control / CUI obligations — **DoD CIO** · **Cyber AB** · **DIBCAC** · **DDTC** · **BIS** · **NIST** · **GSA** · **DCMA** · **DCSA** · **NARA-ISOO**. Operator-format alignment with `state-puc-ai-disclosure-tracker` (EnergyTech), `state-insurance-ai-disclosure-tracker` (InsurTech), and other state-tracker repos in the Suite.

Part of the [Kinetic Gain Protocol Suite](https://suite.kineticgain.com).

> Status: v0.1 seed dataset. 10 authorities, all with first-class AI-specific position captured `as_of` 2026-05-30.

## What it tracks (per authority)

| Field | What it captures |
| --- | --- |
| `authority_id` | Stable identifier (e.g. `DDTC`, `BIS`, `NARA-ISOO`) |
| `name` | Full bureau / office name |
| `scope` | The regulatory surface the authority owns |
| `primary_url` | Public landing for the authority |
| `rulemaking_authority_basis` | Statutes / CFR sections / EOs the authority's rulemaking sits on |
| `primary_obligations` | The handful of obligations a covered entity must satisfy |
| `ai_specific_position_as_of_seed` | What this authority has publicly said about AI as of seed date |
| `enforcement_mode` | The shape of enforcement — `contract-clause-flowdown` vs `license-pre-authorization` vs `facility-personnel-clearance` etc. |

## Why DefenseTech needs a 10-authority state-tracker

Unlike state-level trackers (50 US states), the defense regulatory surface is **federally consolidated but functionally fragmented**. A single AI tool used at a DIB contractor can simultaneously trigger:

1. **DoD CIO** clauses (DFARS 252.204-7012 cyber incident reporting),
2. **Cyber AB** ecosystem (assessor accreditation, RPO certification),
3. **DIBCAC** scrutiny (medium/high-confidence NIST 800-171 assessment),
4. **DDTC** pre-authorization (ITAR USML technical data),
5. **BIS** screening (EAR + Entity List + deemed-export),
6. **NIST** standards-incorporation (AI RMF + SP 800-218A),
7. **GSA** procurement-vehicle (FAR 52.204-21 + GSA Schedule disclosure),
8. **DCMA** contract-admin scrutiny (Contractor Purchasing System Review),
9. **DCSA** facility / personnel clearance (NISPOM at cleared facility),
10. **NARA-ISOO** CUI-Registry-marking compliance (E.O. 13556 + CUI Notice 2020-04).

Each has its own enforcement mode. **None inherit from each other.** A DIB contractor with an AI tool needs alignment across all 10, not just one — and the order they collide in matters for incident response (e.g. a CUI spillage on an ITAR technical data package triggers DoD CIO + DDTC + DCSA + NARA-ISOO in different timeframes).

## Eight enforcement modes encoded

| Mode | Authorities |
| --- | --- |
| `contract-clause-flowdown` | DoD CIO |
| `ecosystem-accreditation` | Cyber AB |
| `government-direct-assessment` | DIBCAC |
| `license-pre-authorization` | DDTC |
| `license-pre-authorization-plus-screening` | BIS |
| `standards-incorporation-by-reference` | NIST |
| `schedule-pre-vetting` | GSA |
| `contract-administration-oversight` | DCMA |
| `facility-personnel-clearance` | DCSA |
| `registry-curation-plus-agency-oversight` | NARA-ISOO |

10 modes / 10 authorities is the most diverse enforcement-mode diversity of any state-tracker in the Suite — reflecting that no two federal-defense authorities work the same way.

## Usage

```bash
npm install
npm run validate    # validates the seed against required-field invariants
npm test            # 7 unit tests against the public API surface
```

```js
import { authorities, byId, byEnforcementMode, summarize } from "dod-cmmc-disclosure-tracker";

const ddtc = byId("DDTC");
const licensors = byEnforcementMode("license-pre-authorization-plus-screening");  // [BIS]
const overview = summarize();   // { authority_count: 10, enforcement_modes: [...], ... }
```

## Composes with

- [`defense-decision-record-audit-stream`](https://github.com/mizcausevic-dev/defense-decision-record-audit-stream) — `regulatory_basis` enum on each audit event maps to authorities tracked here
- [`cmmc-l2-l3-readiness-evidence-bundle`](https://github.com/mizcausevic-dev/cmmc-l2-l3-readiness-evidence-bundle) — the C3PAO/DIBCAC assessment-readiness bundle
- [`defense-ai-incident-card-profile`](https://github.com/mizcausevic-dev/defense-ai-incident-card-profile) — DFARS 72-hour disclosure events map to DoD CIO
- [`cui-data-vault-contract-profile`](https://github.com/mizcausevic-dev/cui-data-vault-contract-profile) — vault contract whose handling rules trace to NARA-ISOO + NIST 800-171
- [Kinetic Gain Protocol Suite](https://suite.kineticgain.com) — umbrella

## Compliance posture

State-tracker is a **regulatory-lifecycle inventory** of federal authorities. It does NOT constitute legal advice on CMMC certification, ITAR / EAR licensing, security-clearance adjudication, or DFARS compliance. Always validate against current authority publications before relying on a field — federal AI rulemaking is in flux. Per the standing Suite public-language guardrail: *readiness · evidence · posture · controls · scaffolding* — never "compliant" / "certified" without externally-attested certification specific to each regulatory regime.

## License

MIT.
