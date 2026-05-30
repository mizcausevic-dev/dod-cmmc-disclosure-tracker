import { test } from "node:test";
import assert from "node:assert/strict";
import { authorities, byId, byEnforcementMode, withAiSpecificPosition, summarize, schemaVersion, asOf } from "../src/index.mjs";

test("dataset has 10 authorities", () => {
  assert.equal(authorities.length, 10);
});

test("schema version + as_of present", () => {
  assert.equal(typeof schemaVersion, "string");
  assert.equal(typeof asOf, "string");
});

test("all canonical authorities present by id", () => {
  for (const id of ["DOD-CIO", "CYBER-AB", "DIBCAC", "DDTC", "BIS", "NIST", "GSA", "DCMA", "DCSA", "NARA-ISOO"]) {
    assert.ok(byId(id), `missing authority ${id}`);
  }
});

test("license-pre-authorization mode covers DDTC + a similar variant for BIS", () => {
  const ddtc = byEnforcementMode("license-pre-authorization");
  assert.ok(ddtc.some((a) => a.authority_id === "DDTC"));
  const bis = byEnforcementMode("license-pre-authorization-plus-screening");
  assert.ok(bis.some((a) => a.authority_id === "BIS"));
});

test("every authority has AI-specific position", () => {
  assert.equal(withAiSpecificPosition().length, authorities.length);
});

test("byId returns null for unknown id", () => {
  assert.equal(byId("DOES-NOT-EXIST"), null);
});

test("summary keys", () => {
  const s = summarize();
  assert.ok(s.authority_count === 10);
  assert.ok(Array.isArray(s.enforcement_modes));
  assert.ok(s.enforcement_modes.length >= 5);
});
