import test from "node:test";
import assert from "node:assert/strict";
import { fieldValidationMessage } from "../src/lib/form-validation";

test("required fields reject whitespace without changing submitted values", () => {
  for (const value of ["", " ", "\t\n"]) assert.notEqual(fieldValidationMessage(value, { required: true }), "");
  assert.equal(fieldValidationMessage("  Synthetic person  ", { required: true }), "");
  assert.equal(fieldValidationMessage("", {}), "");
});

test("email rules match the server's dotted-domain requirement", () => {
  for (const value of ["invalid", "a@b", "a@b.c\nBcc:example", "a b@example.test", "<a>@example.test"]) {
    assert.notEqual(fieldValidationMessage(value, { type: "email" }), "");
  }
  assert.equal(fieldValidationMessage("synthetic@example.test", { type: "email", required: true }), "");
  assert.equal(fieldValidationMessage("", { type: "email" }), "");
});

test("field limits include the boundary and preserve permissive phone values", () => {
  for (const maxLength of [40, 120, 200, 254, 2000, 5000]) {
    assert.equal(fieldValidationMessage("x".repeat(maxLength), { maxLength }), "");
    assert.notEqual(fieldValidationMessage("x".repeat(maxLength + 1), { maxLength }), "");
  }
  assert.equal(fieldValidationMessage("verified-number", { required: true, type: "tel", maxLength: 254 }), "");
});

test("validation messages never repeat the supplied private value", () => {
  const value = "SyntheticPrivateInvalidEmail";
  assert.equal(fieldValidationMessage(value, { type: "email" }).includes(value), false);
});
