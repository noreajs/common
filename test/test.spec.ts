import { equal, doesNotThrow } from "assert";
import {
  isFilled,
  isQueryParamFilled,
  forceNumber,
  assignNestedProperty,
  removeAllWhiteSpaces,
  replaceAllMatch,
  readNestedProperty,
  extractLanguageTag,
  isLocaleValid,
  checkRequiredKeys,
} from "../lib/Utils";

/**
 * isFilled
 */
describe("isFilled", function () {
  it("should return true when value is filled", function () {
    equal(isFilled("hello"), true);
  });

  it("should return false when value is undefined", function () {
    equal(isFilled(undefined), false);
  });

  it("should return false when value is null", function () {
    equal(isFilled(null), false);
  });
});

/**
 * isQueryParamFilled
 */
describe("isQueryParamFilled", function () {
  it("should return true when value is filled", function () {
    equal(isQueryParamFilled("hello"), true);
  });

  it("should return false when value is and empty string", function () {
    equal(isQueryParamFilled(""), false);
  });

  it("should return false when value is undefined", function () {
    equal(isQueryParamFilled(undefined), false);
  });

  it("should return false when value is null", function () {
    equal(isQueryParamFilled(null), false);
  });
});

/**
 * forceNumber
 */
describe("forceNumber", function () {
  it("should return number when value is number", function () {
    equal(forceNumber(100), 100);
  });
  it("should return number when value is number string", function () {
    equal(forceNumber("100"), 100);
  });
  it("should return 0 when value is not a number", function () {
    equal(forceNumber("100a"), 0);
  });
  it("should return 0 when value is NAN", function () {
    equal(forceNumber(NaN), 0);
  });
});

/**
 * assignNestedProperty
 */
describe("assignNestedProperty", function () {
  it("should assign nested property", function () {
    doesNotThrow(function () {
      const data: any = {};
      assignNestedProperty(data, ["level1", "level2"], 100);
      equal(data.level1.level2, 100);
    });
  });
});

/**
 * removeAllWhiteSpaces
 */
describe("removeAllWhiteSpaces", function () {
  it("should remove all white spaces", function () {
    equal(removeAllWhiteSpaces("lambou Arnold T oma   s"), "lambouArnoldTomas");
  });
  it("should replace all white spaces", function () {
    equal(
      removeAllWhiteSpaces("lambou Arnold T oma   s", "-"),
      "lambou-Arnold-T-oma---s"
    );
  });
});

/**
 * replaceAllMatch
 */
describe("replaceAllMatch", function () {
  it("should replace all match", function () {
    equal(
      replaceAllMatch("lambou langouo arnold", /a/g, "A"),
      "lAmbou lAngouo Arnold"
    );
  });
});

/**
 * readNestedProperty
 */
describe("readNestedProperty", function () {
  it("should read nested property", function () {
    doesNotThrow(function () {
      const data: any = {
        level1: {
          level2: 100,
        },
      };
      readNestedProperty(data, ["level1", "level2"]);
      equal(data.level1.level2, 100);
    });
  });
});

/**
 * extractLanguageTag
 */
describe("extractLanguageTag", function () {
  it("should get the first part of the locale separate with underscore", function () {
    equal(extractLanguageTag("en_US"), "en");
  });
  it("should get the first part of the locale separate with dash", function () {
    equal(extractLanguageTag("en-US"), "en");
  });
  it("should return an empty string if the locale is undefined", function () {
    equal(extractLanguageTag(), "");
  });
});

/**
 * isLocaleValid
 */
describe("isLocaleValid", function () {
  it("should return true when the locale is well separated", function () {
    equal(isLocaleValid("en_us"), true);
  });
  it("should return false when the locale is not well separated", function () {
    equal(isLocaleValid("en_b"), false);
  });
});

/**
 * checkRequiredKeys
 */
describe("checkRequiredKeys", function () {
  it("should return uninitialized attributes list", function () {
    const r = checkRequiredKeys(["a", "b", "c"], { a: "filled" });
    equal(JSON.stringify(r), JSON.stringify(["b", "c"]));
  });
});
