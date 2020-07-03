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
 * Obj.pluck
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
 * Obj.pluckNested
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

/**
 * Obj.extend
 */
describe("Obj.extend", function () {
  it("should return an object with custom prefix on key", function () {
    const data = {
      name: "Arnold",
      nickname: "Mortel",
    };

    const extended = Obj.extend({
      data: data,
      keyPrefix: "the.",
      filters: {
        name: [
          function (value) {
            return `Hello ${value}`;
          },
          function (value) {
            return `${value}!`;
          },
        ],
      },
      omits: ["nickname"],
    });

    equal(
      JSON.stringify(extended),
      JSON.stringify({ "the.name": "Hello Arnold!" })
    );
  });
});

/**
 * Obj.flatten
 */
describe("Obj.flatten", function () {
  it("should return an object with flatten key", function () {
    const data = {
      boss: "Big Playa",
      name: {
        nickname: {
          in: {
            the: {
              hood: "Yes",
            },
          },
        },
      },
    };

    const flattened = Obj.flatten({
      data: data,
      prefix: "hey.",
      suffix: ".man",
      omits: ["boss"],
    });

    equal(
      JSON.stringify(flattened),
      JSON.stringify({ "hey.name.nickname.in.the.hood.man": "Yes" })
    );
  });
});

/**
 * Obj.isObject
 */
describe("Obj.isObject", function () {
  it("should return false when given value equal to undefined", function () {
    equal(Obj.isObject(undefined), false);
  });
  it("should return false when given value equal to null", function () {
    equal(Obj.isObject(null), false);
  });
  it("should return false when given value is an array", function () {
    equal(Obj.isObject([]), false);
  });
  it("should return true when given value is an object", function () {
    equal(Obj.isObject({}), true);
  });
});

/**
 * Obj.merge
 */
describe("Obj.merge", function () {
  it("should merge the two object with priority left", function () {
    const obj = {
      id: 10,
      name: "john",
    };

    const obj2 = {
      name: "henry",
    };

    equal(
      JSON.stringify(Obj.merge(obj, obj2)),
      JSON.stringify({ id: 10, name: "john" })
    );
  });

  it("should merge the two object with priority right", function () {
    const obj = {
      id: 10,
      name: "john",
    };

    const obj2 = {
      name: "henry",
    };

    equal(
      JSON.stringify(Obj.merge(obj, obj2, "right")),
      JSON.stringify({ id: 10, name: "henry" })
    );
  });
});
