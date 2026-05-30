// Validates the seed dataset against the spec's invariants.

import { authorities, summarize } from "./index.mjs";

const REQUIRED_FIELDS = [
  "authority_id", "name", "scope", "primary_url",
  "rulemaking_authority_basis", "primary_obligations",
  "ai_specific_position_as_of_seed", "enforcement_mode"
];

const errors = [];
const seenIds = new Set();
for (let i = 0; i < authorities.length; i++) {
  const a = authorities[i];
  for (const field of REQUIRED_FIELDS) {
    if (a[field] === undefined || a[field] === null || a[field] === "") {
      errors.push(`authority[${i}] (${a.authority_id ?? "?"}): missing required field "${field}"`);
    }
  }
  if (a.authority_id) {
    if (seenIds.has(a.authority_id)) errors.push(`authority[${i}]: duplicate authority_id "${a.authority_id}"`);
    seenIds.add(a.authority_id);
  }
  if (a.primary_url && !/^https?:\/\//.test(a.primary_url)) {
    errors.push(`authority[${i}] (${a.authority_id}): primary_url must start with http(s)://`);
  }
  if (a.rulemaking_authority_basis && !Array.isArray(a.rulemaking_authority_basis)) {
    errors.push(`authority[${i}] (${a.authority_id}): rulemaking_authority_basis must be an array`);
  }
  if (a.primary_obligations && !Array.isArray(a.primary_obligations)) {
    errors.push(`authority[${i}] (${a.authority_id}): primary_obligations must be an array`);
  }
}

if (errors.length) {
  for (const e of errors) console.error("✗", e);
  console.error(`\nFAIL · ${errors.length} error(s)`);
  process.exit(1);
}
const s = summarize();
console.log(`OK · ${s.authority_count} authorities · ${s.enforcement_modes.length} enforcement modes · ${s.with_ai_specific_position} with AI-specific position · as_of ${s.as_of}`);
