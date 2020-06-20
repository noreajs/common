import { equal } from "assert";
import Arr from "../lib/Arr";

/**
 * Arr.includes
 */
describe("Arr.includes", function () {
  it("should return true when the array include the value", function () {
    equal(Arr.includes(["a", "b"], "a"), true);
  });
  it("should return false when the array does not include the value", function () {
    equal(Arr.includes(["a", "b"], "c"), false);
  });
});

/**
 * Arr.missing
 */
describe("Arr.missing", function () {
  it("should return element in array a missing in array b", function () {
    const r = Arr.missing(["a", "b"], ["c", "a"]);
    equal(JSON.stringify(r), JSON.stringify(["b"]));
  });
  it("should return a empty array", function () {
    const r = Arr.missing(["a", "b"], ["b", "a"]);
    equal(JSON.stringify(r), JSON.stringify([]));
  });
});
