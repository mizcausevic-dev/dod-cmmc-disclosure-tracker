// Public surface — load the seed dataset + provide query helpers
// over the 10-authority federal-defense regulatory snapshot.

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const DATASET = JSON.parse(readFileSync(resolve(HERE, "../data/authorities.json"), "utf8"));

export const schemaVersion = DATASET.schema_version;
export const asOf = DATASET.as_of;
export const authorities = DATASET.authorities;

export function byId(id) {
  return authorities.find((a) => a.authority_id === id) ?? null;
}

export function byEnforcementMode(mode) {
  return authorities.filter((a) => a.enforcement_mode === mode);
}

export function withAiSpecificPosition() {
  return authorities.filter((a) => a.ai_specific_position_as_of_seed && a.ai_specific_position_as_of_seed.length > 0);
}

export function summarize() {
  return {
    schema_version: schemaVersion,
    as_of: asOf,
    authority_count: authorities.length,
    enforcement_modes: [...new Set(authorities.map((a) => a.enforcement_mode))].sort(),
    with_ai_specific_position: withAiSpecificPosition().length
  };
}
