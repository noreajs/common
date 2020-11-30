import { equal, strictEqual } from "assert";
import Arr from "../lib/Arr";

/**
 * Arr.includes
 */
describe("Arr.includes", function () {
  it("should return true when the array include the value", function () {
    strictEqual(Arr.includes(["a", "b"], "a"), true);
  });
  it("should return false when the array does not include the value", function () {
    strictEqual(Arr.includes(["a", "b"], "c"), false);
  });
});

/**
 * Arr.missing
 */
describe("Arr.missing", function () {
  it("should return element in array a missing in array b", function () {
    const r = Arr.missing(["a", "b"], ["c", "a"]);
    strictEqual(JSON.stringify(r), JSON.stringify(["b"]));
  });
  it("should return a empty array", function () {
    const r = Arr.missing(["a", "b"], ["b", "a"]);
    strictEqual(JSON.stringify(r), JSON.stringify([]));
  });
});

/**
 * Arr.unique
 */
describe("Arr.unique", function () {
  it("should return true when all listed keys are unique", function () {
    const data = [
      { name: "abena", id: 10, size: 24, info: { id: 1, profile: null } },
      { name: "ayoho", id: 10, size: 24, info: { id: 2, profile: null } },
      { name: "ateba", id: 10, size: 24, info: { id: 3, profile: null } },
      { name: "awana", id: 10, size: 24, info: { id: 4, profile: null } },
    ];
    const r = Arr.unique(data, "name");
    strictEqual(r, true);
  });
  it("should return true when each array item are unique", function () {
    const data = [
      { name: "abena", id: 10, size: 24, info: { id: 1, profile: null } },
      { name: "abena", id: 10, size: 24, info: { id: 2, profile: null } },
      { name: "ateba", id: 10, size: 24, info: { id: 3, profile: null } },
      { name: "awana", id: 10, size: 24, info: { id: 4, profile: null } },
    ];
    const r = Arr.unique(data);
    strictEqual(r, true);
  });
  it("should return false when at least on key is not unique", function () {
    const data = [
      { name: "abena", id: 10, size: 1, info: { id: 1, profile: null } },
      { name: "ayoho", id: 1, size: 2, info: { id: 1, profile: null } },
      { name: "ateba", id: 2, size: 3, info: { id: 1, profile: null } },
      { name: "awana", id: 10, size: 4, info: { id: 1, profile: null } },
    ];
    const r = Arr.unique(data, ["name", "id", "size"]);
    strictEqual(r, false);
  });
});

/**
 * Arr.distinct
 */
describe("Arr.distinct", function () {
  it("should return only one item", function () {
    const data = [
      { name: "abena", id: 10, size: 24, info: { id: 1, profile: null } },
      { name: "ayoho", id: 10, size: 24, info: { id: 2, profile: null } },
      { name: "ateba", id: 10, size: 24, info: { id: 3, profile: null } },
      { name: "awana", id: 10, size: 24, info: { id: 4, profile: null } },
    ];
    const r = Arr.distinct(data, "id");
    strictEqual(
      JSON.stringify(r),
      JSON.stringify([
        { name: "abena", id: 10, size: 24, info: { id: 1, profile: null } },
      ])
    );
  });
  it("should return the same array when there is not duplicated value", function () {
    const data = [
      { name: "abena", id: 10, size: 24, info: { id: 1, profile: null } },
      { name: "abena", id: 10, size: 24, info: { id: 2, profile: null } },
      { name: "ateba", id: 10, size: 24, info: { id: 3, profile: null } },
      { name: "awana", id: 10, size: 24, info: { id: 4, profile: null } },
    ];
    const r = Arr.distinct(data);
    strictEqual(JSON.stringify(r), JSON.stringify(data));
  });
  it("should return the first three values of the array", function () {
    const data = [
      { name: "abena", id: 10, size: 1, info: { id: 1, profile: null } },
      { name: "ayoho", id: 1, size: 2, info: { id: 1, profile: null } },
      { name: "ateba", id: 2, size: 3, info: { id: 1, profile: null } },
      { name: "awana", id: 10, size: 4, info: { id: 1, profile: null } },
    ];
    const r = Arr.distinct(data, ["id", "info.id"]);
    strictEqual(
      JSON.stringify(r),
      JSON.stringify([
        { name: "abena", id: 10, size: 1, info: { id: 1, profile: null } },
        { name: "ayoho", id: 1, size: 2, info: { id: 1, profile: null } },
        { name: "ateba", id: 2, size: 3, info: { id: 1, profile: null } },
      ])
    );
  });
});

/**
 * Arr.apply
 */
describe("Arr.apply", function () {
  it("should return an array of number", function () {
    strictEqual(
      JSON.stringify(Arr.apply(["10", "20"], (value) => Number(value))),
      JSON.stringify([10, 20])
    );
  });
  it("should return an array with each item in bracket", function () {
    strictEqual(
      JSON.stringify(Arr.apply(["a", "b"], (value) => `(${value})`)),
      JSON.stringify(["(a)", "(b)"])
    );
  });
});

/**
 * Arr.join
 */
describe("Arr.join", function () {
  it("should return joined values", function () {
    strictEqual(
      JSON.stringify(Arr.join(["arnold", "lambou"], " ")),
      JSON.stringify("arnold lambou")
    );
  });
  it("should return joined value with glue and last glue", function () {
    strictEqual(
      JSON.stringify(Arr.join(["arnold", "lambou", "langouo"], " ", " and ")),
      JSON.stringify("arnold lambou and langouo")
    );
  });
  it("should return joined value with glue (,) and last glue", function () {
    strictEqual(
      JSON.stringify(Arr.join(["arnold", "lambou", "langouo"], ", ", " and ")),
      JSON.stringify("arnold, lambou and langouo")
    );
  });
});
