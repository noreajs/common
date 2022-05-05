import Obj from "../lib/Obj";
import { equal, doesNotThrow, strictEqual } from "assert";
import Arr from "../lib/Arr";

/**
 * Obj.assignNestedProperty
 */
describe("Obj.assignNestedProperty", function () {
  it("should assign nested property", function () {
    doesNotThrow(function () {
      const data: any = {};
      Obj.assignNestedProperty(data, ["level1", "level2"], 100);
      strictEqual(data.level1.level2, 100);
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
      strictEqual(data.level1.level2, 100);
    });
  });
});

/**
 * Obj.missingKeys
 */
describe("Obj.missingKeys", function () {
  it("should return uninitialized attributes list", function () {
    const r = Obj.missingKeys(["a", "b", "c"], { a: "filled" });
    strictEqual(JSON.stringify(r), JSON.stringify(["b", "c"]));
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
    strictEqual(Arr.missing(r, [1, 2]).length, 0);
    strictEqual(JSON.stringify(r), JSON.stringify([1, 2]));
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
    strictEqual(Arr.missing(r, ["Paris", "Monaco"]).length, 0);
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
    strictEqual(Arr.missing(r, ["Paris", "Monaco"]).length, 0);
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
      dead: false,
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

    strictEqual(
      JSON.stringify(extended),
      JSON.stringify({ "the.name": "Hello Arnold!", "the.dead": false })
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

    strictEqual(
      JSON.stringify(flattened),
      JSON.stringify({ "hey.name.nickname.in.the.hood.man": "Yes" })
    );
  });
});

/**
 * Obj.flatten
 */
describe("Obj.reverseFlatten", function () {
  it("should reverse flatten on an object", function () {
    const flattened = { "hey.name.nickname.in.the.hood.man": "Yes" };

    const data = Obj.reverseFlatten({
      flattened,
      prefix: "hey.",
      suffix: ".man",
      omits: ["boss"],
    });

    strictEqual(
      JSON.stringify(data),
      JSON.stringify({
        name: {
          nickname: {
            in: {
              the: {
                hood: "Yes",
              },
            },
          },
        },
      })
    );
  });
});

/**
 * Obj.isObject
 */
describe("Obj.isObject", function () {
  it("should return false when given value equal to undefined", function () {
    strictEqual(Obj.isObject(undefined), false);
  });
  it("should return false when given value equal to null", function () {
    strictEqual(Obj.isObject(null), false);
  });
  it("should return false when given value is an array", function () {
    strictEqual(Obj.isObject([]), false);
  });
  it("should return true when given value is an object", function () {
    strictEqual(Obj.isObject({}), true);
  });
});

/**
 * Obj.merge
 */
describe("Obj.merge", function () {
  it("should merge the two objects with priority left", function () {
    const obj = {
      id: 10,
      name: "john",
    };

    const obj2 = {
      name: "henry",
    };

    strictEqual(
      JSON.stringify(Obj.merge(obj, obj2)),
      JSON.stringify({ id: 10, name: "john" })
    );
  });

  it("should merge the two objects with priority right", function () {
    const obj = {
      id: 10,
      name: "john",
    };

    const obj2 = {
      name: "henry",
    };

    strictEqual(
      JSON.stringify(Obj.merge(obj, obj2, "right")),
      JSON.stringify({ id: 10, name: "henry" })
    );
  });
});

/**
 * Obj.mergeStrict
 */
describe("Obj.mergeStrict", function () {
  it("should merge the two objects with priority left", function () {
    const obj = {
      id: 10,
      name: undefined,
    };

    const obj2 = {
      name: "henry",
    };

    strictEqual(
      JSON.stringify(Obj.mergeStrict(obj, obj2)),
      JSON.stringify({ id: 10 })
    );
  });

  it("should merge the two objects with priority right", function () {
    const obj = {
      id: 10,
      name: "john",
    };

    const obj2 = {
      name: undefined,
    };

    strictEqual(
      JSON.stringify(Obj.mergeStrict(obj, obj2, "right")),
      JSON.stringify({ id: 10 })
    );
  });
});

/**
 * Obj.mergeNested
 */
describe("Obj.mergeNested", function () {
  it("should merge the two objects with nested properties and left priority", function () {
    const obj = {
      id: 10,
      name: "john",
      info: {
        first_name: "john",
        last_name: "doe",
      },
    };

    const obj2 = {
      name: "henry",
      info: {
        middle_name: "hannah",
      },
    };

    strictEqual(
      JSON.stringify(Obj.mergeNested({ left: obj, right: obj2 })),
      JSON.stringify({
        id: 10,
        name: "john",
        info: {
          first_name: "john",
          last_name: "doe",
          middle_name: "hannah",
        },
      })
    );
  });

  it("should merge the two objects with nested properties and right priority", function () {
    const obj = {
      id: 10,
      name: "john",
      info: {
        first_name: "john",
        last_name: "doe",
        middle_name: "hannah",
      },
    };

    const obj2 = {
      name: "manuella",
      info: {
        middle_name: "travas",
      },
    };

    strictEqual(
      JSON.stringify(
        Obj.mergeNested({ left: obj, right: obj2, priority: "right" })
      ),
      JSON.stringify({
        id: 10,
        name: "manuella",
        info: {
          first_name: "john",
          last_name: "doe",
          middle_name: "travas",
        },
      })
    );
  });
});

/**
 * Obj.mergeNestedStrict
 */
describe("Obj.mergeNestedStrict", function () {
  it("should merge the two objects with nested properties and left priority", function () {
    const obj = {
      id: 10,
      name: "john",
      info: {
        first_name: "john",
        last_name: undefined,
      },
    };

    const obj2 = {
      name: "henry",
      info: {
        middle_name: "hannah",
      },
    };

    strictEqual(
      JSON.stringify(Obj.mergeNestedStrict({ left: obj, right: obj2 })),
      JSON.stringify({
        id: 10,
        name: "john",
        info: {
          first_name: "john",
          middle_name: "hannah",
        },
      })
    );
  });

  it("should merge the two objects with nested properties and right priority", function () {
    const obj = {
      id: 10,
      name: "john",
      info: {
        first_name: "john",
        last_name: "doe",
        middle_name: "hannah",
      },
    };

    const obj2 = {
      name: "manuella",
      info: {
        middle_name: undefined,
      },
    };

    strictEqual(
      JSON.stringify(
        Obj.mergeNestedStrict({ left: obj, right: obj2, priority: "right" })
      ),
      JSON.stringify({
        id: 10,
        name: "manuella",
        info: {
          first_name: "john",
          last_name: "doe",
        },
      })
    );
  });
});

/**
 * Obj.clean
 */
describe("Obj.clean", function () {
  it("should remove all null properties", function () {
    doesNotThrow(function () {
      const data = {
        id: 10,
        name: "amina",
        size: null,
      };
      const r = Obj.clean(data);
      strictEqual(JSON.stringify(r), JSON.stringify({ id: 10, name: "amina" }));
    });
  });

  it("should remove all null and undefined properties", function () {
    doesNotThrow(function () {
      const data = {
        id: 10,
        name: "amina",
        size: null,
        age: {
          $exists: false,
        },
        date: {
          first: new Date(1950, 1, 1, 0, 0, 0, 0),
        },
      };
      const r = Obj.clean(data);
      strictEqual(
        JSON.stringify(r),
        JSON.stringify({
          id: 10,
          name: "amina",
          age: {
            $exists: false,
          },
          date: {
            first: new Date(1950, 1, 1, 0, 0, 0, 0),
          },
        })
      );
    });
  });
});

/**
 * Obj.cleanWithEmpty
 */
describe("Obj.cleanWithEmpty", function () {
  it("should remove all null properties", function () {
    doesNotThrow(function () {
      const data = {
        id: 10,
        name: "amina",
        size: null,
        age: {
          $exists: false,
          "owner.user.id": 0,
        },
        lambou: "",
      };
      const r = Obj.cleanWithEmpty(data);
      strictEqual(
        JSON.stringify(r),
        JSON.stringify({
          id: 10,
          name: "amina",
          age: {
            $exists: false,
            "owner.user.id": 0,
          },
        })
      );
    });
  });

  it("should remove all null and undefined properties", function () {
    doesNotThrow(function () {
      const data = {
        id: 10,
        name: "amina",
        size: null,
        age: undefined,
        arnold: "",
        obj: {
          id: 10,
          name: "amina",
          size: null,
          age: undefined,
          arnold: "",
          objc: {
            id: 10,
            name: "amina",
            size: null,
            age: undefined,
            arnold: "",
          },
        },
      };
      const r = Obj.cleanWithEmpty(data);
      strictEqual(JSON.stringify(r), JSON.stringify({
        id: 10,
        name: "amina",
        obj: {
          id: 10,
          name: "amina",
          objc: {
            id: 10,
            name: "amina",
          },
        },
      }));
    });
  });
});
