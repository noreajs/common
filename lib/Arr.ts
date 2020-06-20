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
}

export default Arr;
