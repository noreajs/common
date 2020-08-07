import Obj from "./Obj";

class Arr {
  /**
   * Check if the given array content the value
   * @param array array
   * @param value searched value
   */
  static includes(array: (string | number)[], value: string | number) {
    for (const item of array) {
      if (item === value) {
        return true;
      }
    }
    return false;
  }

  /**
   * Returns the values in array a missing in array b
   * @param a first array
   * @param b second array
   */
  static missing(a: Array<string | number>, b: Array<string | number>) {
    const r = [];
    for (const item of a) {
      if (!Arr.includes(b as any, item)) {
        r.push(item);
      }
    }
    return r;
  }

  /**
   * Test the uniqueness of values of an array
   * @param arr array
   * @param keys Keys when it is an array of objects
   * @param separator separator for nested properties
   */
  static unique<T = any>(
    arr: Array<T>,
    keys?: keyof T | string | Array<keyof T | string>,
    separator: string | RegExp = "."
  ) {
    if (arr.length === 0) {
      return true;
    } else {
      /**
       * Check if a key value is unique in the array
       * @param key array key
       */
      function keyIsUnique(key: keyof T | string) {
        const firstItem = arr[0];
        const path = (key as string).split(separator);
        const r = arr.filter(
          (i) =>
            JSON.stringify(Obj.readNestedProperty(firstItem, path)) ===
            JSON.stringify(Obj.readNestedProperty(i, path))
        );
        return !(r.length > 1);
      }

      /**
       * Check if an array's value is unique
       * @param value value
       */
      function valueIsUnique(value: any) {
        const r = arr.filter(
          (i) => JSON.stringify(i) === JSON.stringify(value)
        );
        return !(r.length > 1);
      }

      /**
       * If key provided
       */
      if (keys) {
        if (Array.isArray(keys)) {
          for (const key of keys) {
            if (!keyIsUnique(key)) {
              return false;
            }
          }
        } else {
          if (!keyIsUnique(keys)) {
            return false;
          }
        }
      } else {
        for (const value of arr) {
          if (!valueIsUnique(value)) {
            return false;
          }
        }
        return true;
      }
    }
    return true;
  }

  /**
   * Eliminates duplicates in an array
   * @param arr array
   * @param keys Keys when it is an array of objects
   * @param separator separator for nested properties
   */
  static distinct<T = any>(
    /**
     * array
     */
    arr: Array<T>,
    /**
     * Keys when it is an array of objects
     */
    keys?: keyof T | string | Array<keyof T | string>,
    /**
     * Separator for nested properties
     * @default .
     */
    separator: string | RegExp = "."
  ) {
    if (arr.length === 0) {
      return arr;
    } else {
      /**
       * keys provided
       */
      if (keys) {
        /**
         * Array of keys provided
         */
        if (Array.isArray(keys)) {
          const r: Array<T> = [];
          for (const item of arr) {
            if (
              !r.find((i) => {
                for (const key of keys) {
                  const path = (key as string).split(separator);
                  if (
                    JSON.stringify(Obj.readNestedProperty(i, path)) !==
                    JSON.stringify(Obj.readNestedProperty(item, path))
                  ) {
                    return false;
                  }
                }
                return true;
              })
            ) {
              r.push(item);
            }
          }
          return r;
        } else {
          const r: Array<T> = [];
          const path = (keys as string).split(separator);
          for (const item of arr) {
            if (
              !r.find(
                (i) =>
                  JSON.stringify(Obj.readNestedProperty(i, path)) ===
                  JSON.stringify(Obj.readNestedProperty(item, path))
              )
            ) {
              r.push(item);
            }
          }
          return r;
        }
      } else {
        const r: Array<T> = [];
        for (const item of arr) {
          if (!r.find((i) => JSON.stringify(i) === JSON.stringify(item))) {
            r.push(item);
          }
        }
        return r;
      }
    }
  }
}

export default Arr;
