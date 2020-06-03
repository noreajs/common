/**
 * Get if the given value is null or undefined
 * @param value input
 */
export const isFilled = (value: any) => {
  return value !== null && value !== undefined;
};

/**
 * Get if the given value is null or undefined and length > 0
 * @param value input
 */
export const isQueryParamFilled = (value: any) => {
  return value !== null && value !== undefined && `${value}`.length !== 0;
};

/**
 * Return 0 if the number in NaN and the number if not
 * @param value number
 */
export const forceNumber = (value: any): number => {
  const num = Number(value);
  return isNaN(num) ? 0 : num;
};

/**
 * Assign nested property in object
 *
 * @param obj object
 * @param keyPath key path list
 * @param value value to assign
 */
export const assignNestedProperty = (
  obj: any,
  keyPath: Array<string>,
  value: any
) => {
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
};

/**
 * Remove all white spaces in string
 * @param value string
 * @param replacement string that will replace the space
 */
export const removeAllWhiteSpaces = (value: string, replacement?: string) => {
  return value.replace(/\s/g, replacement || "");
};

/**
 * Replace all occurences of a searched string in another string
 *
 * @param value target string
 * @param search element to replace
 * @param replacement replacement
 */
export const replaceAllMatch = (
  value: string,
  search: RegExp,
  replacement: string
) => {
  return value.replace(search, replacement);
};

/**
 * Return a value of a nested property (last key in the given path)
 * @param obj object
 * @param keyPath key path list
 */
export const readNestedProperty = (obj: any, keyPath: Array<string>) => {
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
};

/**
 * Extract language tag
 * @param value language string
 */
export const extractLanguageTag = (value?: string) => {
  if (value) {
    if (value.indexOf("-") != -1) {
      return value?.split("-")[0];
    } else if (value.indexOf("_") != -1) {
      return value?.split("_")[0];
    } else {
      return "";
    }
  } else {
    return "";
  }
};

/**
 * Check if the locale string is valid
 * @param locale locale
 */
export const isLocaleValid = (locale?: string) => {
  if (locale !== null && locale !== undefined && locale.length != 0) {
    let parts = locale.split(/[_-]/);

    if (parts.length != 2) {
      return false;
    } else {
      for (let index = 0; index < parts.length; index++) {
        const tag = parts[index];
        if (tag.length != 2) {
          return false;
        }
      }
      return true;
    }
  } else {
    return false;
  }
};