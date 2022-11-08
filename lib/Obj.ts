class Obj {
  /**
   * Assign nested property in object
   *
   * @param obj object
   * @param keyPath key path list
   * @param value value to assign
   */
  static assignNestedProperty(obj: any, keyPath: Array<string>, value: any) {
    for (let index = 0; index < keyPath.length; index++) {
      const key = keyPath[index];
      if (index != keyPath.length - 1) {
        if (!(key in obj)) {
          obj[key] = {};
        }
        obj = obj[key];
      } else {
        obj[key] = value;
      }
    }
  }

  /**
   * Return a value of a nested property (last key in the given path)
   * @param obj object
   * @param keyPath key path list
   */
  static readNestedProperty(obj: any, keyPath: Array<string>) {
    for (let index = 0; index < keyPath.length; index++) {
      const key = keyPath[index];
      if (index != keyPath.length - 1) {
        if (!(key in obj)) {
          return undefined;
        }
        obj = obj[key];
      } else {
        return obj[key];
      }
    }
    return undefined;
  }

  /**
   * Returns keys in the given array missing in the targeted object.
   * @param keys keys
   * @param target object
   */
  static missingKeys<T, K = keyof T>(keys: K[], target: T): K[] {
    const r: K[] = [];
    for (const attr of keys) {
      const element = (target as any)[attr];
      if (
        element === null ||
        element === undefined ||
        (typeof element === "string" && element.length === 0)
      ) {
        r.push(attr);
      }
    }
    return r;
  }

  /**
   * Extracting a list of property values.
   * @param obj object
   * @param key key
   */
  static pluck<T>(array: T[], key: keyof T): any[] {
    const r = [];
    for (const obj of array) {
      for (const keyItem in obj) {
        if (keyItem === key) {
          const element = obj[keyItem];
          r.push(element);
        }
      }
    }
    return r;
  }

  /**
   * Extracting a list of nested property values.
   * @param obj object
   * @param key key
   */
  static pluckNested(array: any[], keyPath: string | Array<string>): any[] {
    const r = [];
    for (const obj of array) {
      const path = typeof keyPath === "string" ? keyPath.split(".") : keyPath;
      r.push(Obj.readNestedProperty(obj, path));
    }
    return r;
  }

  /**
   * Extend given data
   * @param params parameters
   */
  static extend<T>(params: {
    /**
     * Values from form
     */
    data: any;

    /**
     * Filter to be applied to values
     */
    filters?: {
      [key: string]: ((value: any) => any) | Array<(value: any) => any>;
    };

    /**
     * Prefix to be applied before each key
     */
    keyPrefix?: string;

    /**
     * Suffix to be applied after each key
     */
    keySuffix?: string;

    /**
     * Values to be omitted
     */
    omits?: Array<keyof T>;

    additional?: {
      [key: string]: any;
    };
  }) {
    let data: any = {};
    let keyRealPrefix = params.keyPrefix ?? "";
    let keyRealSuffix = params.keySuffix ?? "";

    for (const key in params.data) {
      if (params.omits && params.omits.find((k) => k === key)) {
        continue;
      }

      if (Object.hasOwnProperty.bind(params.data)(key)) {
        let value = params.data[key];

        /**
         * Apply filter
         */
        if (params.filters) {
          const filterKey = Object.keys(params.filters).find(
            (item) => item === key
          );
          if (filterKey) {
            let filterList = params.filters[filterKey];

            if (!Array.isArray(filterList)) {
              filterList = [filterList];
            }

            for (const filter of filterList) {
              value = filter(value);
            }
          }
        }

        if (value !== null || value !== undefined) {
          // inject value
          data[`${keyRealPrefix}${key}${keyRealSuffix}`] = value;
        }
      }
    }

    /**
     * Inject additional data
     */
    if (params.additional) {
      data = {
        ...data,
        ...params.additional,
      };
    }

    return data;
  }

  /**
   * Flatten an object
   * @param params parameters
   */
  static flatten = (params: {
    /**
     * object to flatten
     */
    data: object;

    /**
     * Separator
     * @default .
     */
    separator?: string | RegExp;

    /**
     * String to be added to each key
     */
    prefix?: string;

    /**
     * String to be added at the end of each key
     */
    suffix?: string;

    /**
     * Values to be omitted
     */
    omits?: string[];
  }) => {
    let separator = params.separator ?? ".";
    let realPrefix = params.prefix ?? "";
    let realSuffix = params.suffix ?? "";
    let result: any = {};
    let data: any = params.data ?? {};

    for (const key in data) {
      if (Object.hasOwnProperty.bind(data)(key)) {
        const element = (data)[key];
        if (Obj.isObject(element)) {
          if (Object.keys(element).length !== 0) {
            result = {
              ...result,
              ...Obj.flatten({
                data: element,
                prefix: `${realPrefix}${key}${separator}`,
                suffix: realSuffix,
                separator: separator,
              }),
            };
          } else {
            result[`${realPrefix}${key}`] = element;
          }
        } else {
          const newKey = `${realPrefix}${key}${realSuffix}`;
          if (
            !params.omits ||
            !params.omits.find(
              (item) => `${realPrefix}${item}${realSuffix}` === newKey
            )
          ) {
            result[`${realPrefix}${key}${realSuffix}`] = element;
          }
        }
      }
    }
    return result;
  };

  /**
   * Reverse a flattened object
   * @param params parameters
   */
  static reverseFlatten(params: {
    /**
     * object to flatten
     */
    flattened: object;

    /**
     * Keys separator
     * @default .
     */
    separator?: string | RegExp;

    /**
     * String to be added to each key
     */
    prefix?: string;

    /**
     * String to be added at the end of each key
     */
    suffix?: string;

    /**
     * Values to be omitted
     */
    omits?: string[];
  }) {
    const separator = params.separator ?? ".";
    const result: any = {};
    const flattenedData: any = params.flattened ?? {};

    for (const key in flattenedData) {
      if (
        Object.hasOwnProperty.bind(flattenedData)(key) &&
        (!params.omits || !params.omits.includes(key))
      ) {
        // initialize original key
        let originalKey = key;

        // remove suffix if exist
        if (params.suffix) {
          originalKey = originalKey.substr(
            0,
            key.length - params.suffix.length + 1
          );
        }

        // remove preffix if exist
        if (params.prefix) {
          originalKey = originalKey.substring(
            params.prefix.length,
            originalKey.length - 1
          );
        }

        if (!params.omits || !params.omits.includes(originalKey)) {
          Obj.assignNestedProperty(
            result,
            originalKey.split(separator),
            flattenedData[key]
          );
        }
      }
    }
    return result;
  }

  /**
   * check if a value is an Object
   * @param data object
   */
  static isObject(data: any) {
    const r =
      data != null &&
      data != undefined &&
      !Array.isArray(data) &&
      typeof data === "object" &&
      data?.constructor === Object;
    return r;
  }

  /**
   * Merge two objects
   * @param left left object
   * @param right right object
   * @param priority left or right
   */
  static merge(left: any, right: any, priority: "left" | "right" = "left") {
    const mergedKeys: string[] = [];
    const leftData = left ?? {}, rightData = right ?? {};

    for (const key of [...Object.keys(leftData), ...Object.keys(rightData)]) {
      if (!mergedKeys.includes(key)) {
        mergedKeys.push(key);
      }
    }

    const merged: any = {};

    for (const key of mergedKeys) {
      switch (priority) {
        case "left":
          merged[key] = leftData[key] ?? rightData[key];
          break;
        case "right":
          merged[key] = rightData[key] ?? leftData[key];
          break;
      }
    }

    return merged;
  }

  /**
   * Merge two objects; it replace as soon as the key exists in the priority object
   * @param left left object
   * @param right right object
   * @param priority left or right
   */
  static mergeStrict(
    left: any,
    right: any,
    priority: "left" | "right" = "left"
  ) {
    const mergedKeys: string[] = [];
    const leftData: any = left ?? {}, rightData = right ?? {};

    for (const key of [...Object.keys(leftData), ...Object.keys(rightData)]) {
      if (!mergedKeys.includes(key)) {
        mergedKeys.push(key);
      }
    }

    const merged: any = {};

    for (const key of mergedKeys) {
      switch (priority) {
        case "left":
          merged[key] = Object.prototype.hasOwnProperty.call(leftData, key)
            ? leftData[key]
            : rightData[key];
          break;
        case "right":
          merged[key] = Object.prototype.hasOwnProperty.call(rightData, key)
            ? rightData[key]
            : leftData[key];
          break;
      }
    }

    return merged;
  }

  /**
   * Merge object with nested properties
   * @param params parameters
   */
  static mergeNested(params: {
    /**
     * Left object
     */
    left: any;

    /**
     * Right object
     */
    right: any;

    /**
     * Merge priority
     */
    priority?: "left" | "right";

    /**
     * Separator to flatten objects
     */
    separator?: string;
  }) {
    const priority = params.priority ?? "left";
    const separator = params.separator ?? "----";
    const mergedKeys: string[] = [];
    const leftFlattened = Obj.flatten({ data: params.left ?? {}, separator });
    const rightFlattened = Obj.flatten({ data: params.right ?? {}, separator });

    for (const key of [
      ...Object.keys(leftFlattened),
      ...Object.keys(rightFlattened),
    ]) {
      if (!mergedKeys.includes(key)) {
        mergedKeys.push(key);
      }
    }

    const merged: any = {};

    for (const key of mergedKeys) {
      switch (priority) {
        case "left":
          merged[key] = leftFlattened[key] ?? rightFlattened[key];
          break;
        case "right":
          merged[key] = rightFlattened[key] ?? leftFlattened[key];
          break;
      }
    }

    return Obj.reverseFlatten({
      flattened: merged,
      separator,
    });
  }

  /**
   * Merge object with nested properties; the target replace as soon as the key exists in the priority object
   * @param params parameters
   */
  static mergeNestedStrict(params: {
    /**
     * Left object
     */
    left: any;

    /**
     * Right object
     */
    right: any;

    /**
     * Merge priority
     */
    priority?: "left" | "right";

    /**
     * Separator to flatten objects
     */
    separator?: string;
  }) {
    const priority = params.priority ?? "left";
    const separator = params.separator ?? "----";
    const mergedKeys: string[] = [];
    const leftFlattened = Obj.flatten({ data: params.left ?? {}, separator });
    const rightFlattened = Obj.flatten({ data: params.right ?? {}, separator });

    for (const key of [
      ...Object.keys(leftFlattened),
      ...Object.keys(rightFlattened),
    ]) {
      if (!mergedKeys.includes(key)) {
        mergedKeys.push(key);
      }
    }

    const merged: any = {};

    for (const key of mergedKeys) {
      switch (priority) {
        case "left":
          merged[key] = Object.prototype.hasOwnProperty.call(leftFlattened, key)
            ? leftFlattened[key]
            : rightFlattened[key];
          break;
        case "right":
          merged[key] = Object.prototype.hasOwnProperty.call(
            rightFlattened,
            key
          )
            ? rightFlattened[key]
            : leftFlattened[key];
          break;
      }
    }

    return Obj.reverseFlatten({
      flattened: merged,
      separator,
    });
  }

  /**
   * Remove null or undefined properties in an object
   * @param obj object to clean
   * @param separator separator for nested properties
   */
  static clean(obj: any, separator: string | RegExp = ":-:-:") {
    const r: any = {};
    const flattened = Obj.flatten({ data: obj, separator: separator });
    for (const key in flattened) {
      if (Object.prototype.hasOwnProperty.call(flattened, key)) {
        const element = flattened[key];
        if (element !== null && element !== undefined) {
          Obj.assignNestedProperty(r, key.split(separator), element);
        }
      }
    }
    return r;
  }

  /**
   * Remove null or undefined properties in an object
   * @param obj object to clean
   * @param separator separator for nested properties
   */
  static cleanWithEmpty(obj: any, separator: string | RegExp = ":-:-:") {
    const r: any = {};
    const flattened = Obj.flatten({ data: obj, separator: separator });
    // console.log("flattened", flattened);
    for (const key in flattened) {
      if (Object.prototype.hasOwnProperty.call(flattened, key)) {
        const element = flattened[key];
        if (
          (element !== null &&
            element !== undefined &&
            typeof element !== "string") ||
          (typeof element === "string" && element.length !== 0)
        ) {
          Obj.assignNestedProperty(r, key.split(separator), element);
        }
      }
    }
    return r;
  }

  /**
   * Remove null, undefined, false, empty string and empty array properties in an object
   * @param obj object to clean
   * @param separator separator for nested properties
   */
  static cleanAll(obj: any, separator: string | RegExp = ":-:-:") {
    const r: any = {};
    const flattened = Obj.flatten({ data: obj, separator: separator });
    // console.log("flattened", flattened);
    for (const key in flattened) {
      if (Object.prototype.hasOwnProperty.call(flattened, key)) {
        const element = flattened[key];
        if (element !== null &&
          element !== undefined &&
          (typeof element !== "string" || element.length !== 0) &&
          (typeof element !== "boolean" || element === true) &&
          (!Array.isArray(element) || element.length !== 0) &&
          (typeof element !== "object" || Object.keys(element).length !== 0)
        ) {
          Obj.assignNestedProperty(r, key.split(separator), element);
        }
      }
    }
    return r;
  }

  /**
   * Turn undefined to null properties in an object
   * @param obj object to clean
   * @param separator separator for nested properties
   */
  static undefinedToNull(obj: any, separator: string | RegExp = ":-:-:") {
    const r: any = {};
    const flattened = Obj.flatten({ data: obj, separator: separator });
    // console.log("flattened", flattened);
    for (const key in flattened) {
      if (Object.prototype.hasOwnProperty.call(flattened, key)) {
        const element = flattened[key];
        if (element === undefined) {
          Obj.assignNestedProperty(r, key.split(separator), null);
        } else {
          Obj.assignNestedProperty(r, key.split(separator), element);
        }
      }
    }
    return r;
  }
}

export default Obj;
