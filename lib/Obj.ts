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
      if (!element || (typeof element === "string" && element.length === 0)) {
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
      [key: string]: Array<(value: any) => any>;
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

      if (params.data.hasOwnProperty(key)) {
        let value = params.data[key];

        /**
         * Apply filter
         */
        if (params.filters) {
          const filterKey = Object.keys(params.filters).find(
            (item) => item === key
          );
          if (filterKey) {
            for (const filter of params.filters[filterKey]) {
              value = filter(value);
            }
          }
        }

        if (value) {
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
    separator?: string;

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
    for (const key in params.data) {
      if (params.data.hasOwnProperty(key)) {
        const element = (params.data as any)[key];
        if (Obj.isObject(element)) {
          result = {
            ...result,
            ...Obj.flatten({
              data: element,
              prefix: `${realPrefix}${key}${separator}`,
              suffix: realSuffix,
            }),
          };
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

    for (const key in params.flattened) {
      if (
        params.flattened.hasOwnProperty(key) &&
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
            (params.flattened as any)[key]
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
    return !Array.isArray(data) && typeof data === "object" && data !== null;
  }

  /**
   * Merge two objects
   * @param left left object
   * @param right right object
   * @param priority left or right
   */
  static merge(left: any, right: any, priority: "left" | "right" = "left") {
    const mergedKeys: string[] = [];

    for (const key of [...Object.keys(left), ...Object.keys(right)]) {
      if (!mergedKeys.includes(key)) {
        mergedKeys.push(key);
      }
    }

    const merged: any = {};

    for (const key of mergedKeys) {
      switch (priority) {
        case "left":
          merged[key] = left[key] ?? right[key];
          break;
        case "right":
          merged[key] = right[key] ?? left[key];
          break;
      }
    }

    return merged;
  }

  /**
   *
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
    const leftFlattened = Obj.flatten({ data: params.left, separator });
    const rightFlattened = Obj.flatten({ data: params.right, separator });

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
}

export default Obj;
