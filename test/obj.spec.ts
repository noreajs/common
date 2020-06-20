import Obj from "../lib/Obj";
import { equal, doesNotThrow } from "assert";
import Arr from "../lib/Arr";

/**
 * Obj.assignNestedProperty
 */
describe("Obj.assignNestedProperty", function () {
  it("should assign nested property", function () {
    doesNotThrow(function () {
      const data: any = {};
      Obj.assignNestedProperty(data, ["level1", "level2"], 100);
      equal(data.level1.level2, 100);
    });
  });
});

/**
 * Obj.readNestedProperty
 */
describe("Obj.readNestedProperty", function () {
  it("should read nested property", function () {
    doesNotThrow(function () {
      const data: any = {
        level1: {
          level2: 100,
        },
      };
      Obj.readNestedProperty(data, ["level1", "level2"]);
      equal(data.level1.level2, 100);
    });
  });
});

/**
 * Obj.missingKeys
 */
describe("Obj.missingKeys", function () {
  it("should return uninitialized attributes list", function () {
    const r = Obj.missingKeys(["a", "b", "c"], { a: "filled" });
    equal(JSON.stringify(r), JSON.stringify(["b", "c"]));
  });
});

/**
 * Object.pluck
 */
describe("Obj.pluck", function () {
  it("should return the list of extracted property values", function () {
    const r = Obj.pluck(
      [
        {
          id: 1,
          name: "john",
        },
        {
          id: 2,
          name: "b",
        },
      ],
      "id"
    );
    equal(Arr.missing(r, [1, 2]).length, 0);
    equal(JSON.stringify(r), JSON.stringify([1, 2]));
  });
});

/**
 * Object.pluckNested
 */
describe("Obj.pluckNested", function () {
  it("should return the list of extracted nested property values (dot notation)", function () {
    const r = Obj.pluckNested(
      [
        {
          id: 1,
          name: "john",
          subInfo: {
            birthplace: "Monaco",
            dob: "27-03-1995",
          },
        },
        {
          id: 2,
          name: "b",
          subInfo: {
            birthplace: "Paris",
            dob: "01-01-1996",
          },
        },
      ],
      "subInfo.birthplace"
    );
    equal(Arr.missing(r, ["Paris", "Monaco"]).length, 0);
  });

  it("should return the list of extracted nested property values (array notation)", function () {
    const r = Obj.pluckNested(
      [
        {
          id: 1,
          name: "john",
          subInfo: {
            birthplace: "Monaco",
            dob: "27-03-1995",
          },
        },
        {
          id: 2,
          name: "b",
          subInfo: {
            birthplace: "Paris",
            dob: "01-01-1996",
          },
        },
      ],
      ["subInfo", "birthplace"]
    );
    equal(Arr.missing(r, ["Paris", "Monaco"]).length, 0);
  });
});
