import {isNumber} from "./helpers";

test("isNumber: one", () => {
  expect(isNumber("one")).toEqual(false);
});

test("isNumber: 1", () => {
  expect(isNumber("1")).toEqual(true);
});

test("isNumber: -1", () => {
  expect(isNumber("-1")).toEqual(true);
});

test("isNumber: 0", () => {
  expect(isNumber("0")).toEqual(true);
});

test("isNumber: 999 999 999", () => {
  expect(isNumber("999 999 999")).toEqual(false);
});

test("isNumber: 999_999_999", () => {
  expect(isNumber("999_999_999")).toEqual(false);
});

test("isNumber: 1e5", () => {
  expect(isNumber("1e5")).toEqual(true);
});

