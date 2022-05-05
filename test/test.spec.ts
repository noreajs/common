import { doesNotThrow, strictEqual } from "assert";
import {
  isFilled,
  isQueryParamFilled,
  forceNumber,
  removeAllWhiteSpaces,
  replaceAllMatch,
  extractLanguageTag,
  isLocaleValid,
} from "../lib/Utils";
import Arr from "../lib/Arr";
import Obj from "../lib/Obj";

/**
 * isFilled
 */
describe("isFilled", function () {
  it("should return true when value is filled", function () {
    strictEqual(isFilled("hello"), true);
  });

  it("should return false when value is undefined", function () {
    strictEqual(isFilled(undefined), false);
  });

  it("should return false when value is null", function () {
    strictEqual(isFilled(null), false);
  });
});

/**
 * isQueryParamFilled
 */
describe("isQueryParamFilled", function () {
  it("should return true when value is filled", function () {
    strictEqual(isQueryParamFilled("hello"), true);
  });

  it("should return false when value is and empty string", function () {
    strictEqual(isQueryParamFilled(""), false);
  });

  it("should return false when value is undefined", function () {
    strictEqual(isQueryParamFilled(undefined), false);
  });

  it("should return false when value is null", function () {
    strictEqual(isQueryParamFilled(null), false);
  });
});

/**
 * forceNumber
 */
describe("forceNumber", function () {
  it("should return number when value is number", function () {
    strictEqual(forceNumber(100), 100);
  });
  it("should return number when value is number string", function () {
    strictEqual(forceNumber("100"), 100);
  });
  it("should return 0 when value is not a number", function () {
    strictEqual(forceNumber("100a"), 0);
  });
  it("should return 0 when value is NAN", function () {
    strictEqual(forceNumber(NaN), 0);
  });
});

/**
 * assignNestedProperty
 */
describe("assignNestedProperty", function () {
  it("should assign nested property", function () {
    doesNotThrow(function () {
      const data: any = {};
      Obj.assignNestedProperty(data, ["level1", "level2"], 100);
      strictEqual(data.level1.level2, 100);
    });
  });
});

/**
 * removeAllWhiteSpaces
 */
describe("removeAllWhiteSpaces", function () {
  it("should remove all white spaces", function () {
    strictEqual(removeAllWhiteSpaces("lambou Arnold T oma   s"), "lambouArnoldTomas");
  });
  it("should replace all white spaces", function () {
    strictEqual(
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
    strictEqual(
      replaceAllMatch("lambou langouo arnold", /a/g, "A"),
      "lAmbou lAngouo Arnold"
    );
  });
});

/**
 * extractLanguageTag
 */
describe("extractLanguageTag", function () {
  it("should get the first part of the locale separate with underscore", function () {
    strictEqual(extractLanguageTag("en_US"), "en");
  });
  it("should get the first part of the locale separate with dash", function () {
    strictEqual(extractLanguageTag("en-US"), "en");
  });
  it("should return an empty string if the locale is undefined", function () {
    strictEqual(extractLanguageTag(), "");
  });
});

/**
 * isLocaleValid
 */
describe("isLocaleValid", function () {
  it("should return true when the locale is well separated", function () {
    strictEqual(isLocaleValid("en_us"), true);
  });
  it("should return false when the locale is not well separated", function () {
    strictEqual(isLocaleValid("en_b"), false);
  });
});
