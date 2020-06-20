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
}

export default Obj;
