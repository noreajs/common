# Common tools for Norea.Js

The package include many functions that are used by the Norea.Js itself. Feel free to use them in your own applications or projects if you find them useful. This package does not have any dependencies.

## Arrays & Objects

### Obj.isObject

The _Obj.isObject_ method allows you to check if the given value is an object or not.

Method import

```typescript
import { Obj } from "@noreajs/common";
```

Method definition

```typescript
Obj.isObject(data: any): boolean;
```

Method parameters

- **data**: Value to be checked

Example

```typescript
const value = Obj.isObject(undefined);
// false

const value = Obj.isObject(null);
// false

const value = Obj.isObject([]);
// false

const value = Obj.isObject({});
// true
```



### Obj.flatten

The _Obj.flatten_ method allows you to flatten an object.

Method import

```typescript
import { Obj } from "@noreajs/common";
```

Method definition

```typescript
Obj.flatten: (params: {
    data: object;
    prefix?: string;
    suffix?: string;
    omits?: string[];
}) => any
```

Method parameters

- **params**: Parameters
  - **data**: object to be flattened
  - **prefix**: string to be added at the beginning of each key
  - **suffix**: string to be added at the end of each key
  - **omits**: array of key to be omitted while flattening the data. You can path (nested keys separated by dots).

Example

```typescript
const data = {
    country: {
        region: {
            city: {
                block: "Troy"
            }
        }
    }
};

const flattened = Obj.flatten({
    data: data,
    prefix: "world."
});

// {
//     "world.country.region.city.block": "Troy"
// }
```



### Obj.assignNestedProperty

The _Obj.assignNestedProperty_ method allows you to inject an attribute into an object no matter the level of nesting.

Method import

```typescript
import { Obj } from "@noreajs/common";
```

Method definition

```typescript
const assignNestedProperty: (
  obj: any,
  keyPath: Array<string>,
  value: any
) => void;
```

Method parameters

- **obj**: object into which you want to inject the data
- **keyPath**: table containing in order each step of the path to the attribute
- **value**: value to assign

Example

```typescript
const user = {
  name: "John",
  email: "john-conor@sky.net",
};

Obj.assignNestedProperty(user, ["country", "city", "name"], "Newyork");

// New user value:
// {
// 	"name": "John",
// 	"email": "john-conor@sky.net",
// 	"country": {
// 		"city": {
// 			"name": "Newyork"
// 		}
// 	}
// }
```

### Obj.readNestedProperty

The _Obj.readNestedProperty_ method help you to read an attribute into an object no matter the level of nesting.

Method import

```typescript
import { Obj } from "@noreajs/common";
```

Method definition

```typescript
const readNestedProperty: (obj: any, keyPath: Array<string>) => any;
```

Method parameters

- **obj**: the object that contains the valu
- **keyPath**: table containing in order each step of the path to the attribute

Example

```typescript
const user = {
	"name": "John",
	"email": "john-conor@sky.net",
	"country": {
		"name": "U.S.A"
		"city": {
			"name": "Newyork"
		}
	}
}

const cityName = Obj.readNestedProperty(user, ["country", "city", "name"]);
// Newyork

```

### Obj.missingKeys

The _Arr.missingKeys_ method returns the attributes of the given array that have not been filled in and the target object.

Method import

```typescript
import { Obj } from "@noreajs/common";
```

Method definition

```typescript
// typescript
function missingKeys<T, K = keyof T>(keys: K[], target: T): K[]

// javascript
function missingKeys(attrs, target);
```

Method parameters

- **attrs**: table of _target_'s required attributes
- **target**: object

Example

```typescript
const user = {
  name: "Lambou",
  nickname: "The Beast",
  jobTitle: "Big Food personal coach",
};

const keys = Obj.missingKeys(["name", "nickname"], user);
// []

const keys = Obj.missingKeys(["birthdate", "birthplace", "name"], user);
// ["birthdate", "birthplace"]
```

### Obj.pluck

The _Arr.pluck_ method extract a list of property values.

Method import

```typescript
import { Obj } from "@noreajs/common";
```

Method definition

```typescript
// typescript
function pluck<T>(array: T[], key: keyof T): any[]

// javascript
function pluck(array, key);
```

Method parameters

- **array**: array of object
- **key**: key to be extracted

Example

```typescript
const users = [
    {
        id: 1,
        name: "Lambou",
    },
    {
        id: 2,
        name: "Arnold"
    }
];

const values = Obj.pluck(users, "id");
// [1, 2]

const values = Obj.pluck(users, "name");
// ["Lambou", "Arnold"]
```

### Obj.pluckNested

The _Arr.pluckNested_ method extract a list of property values.

Method import

```typescript
import { Obj } from "@noreajs/common";
```

Method definition

```typescript
// typescript
function pluckNested(array: any[], keyPath: string | string[]): any[]

// javascript
function pluckNested(array, keyPath);
```

Method parameters

- **array**: array of object
- **keyPath**: key path of property to be extracted

Example

```typescript
const users = [
    {
        id: 1,
        name: "Lambou",
        info: {
            birth: "27-03-1995",
            birthplace: "Bangangté"
        }
    },
    {
        id: 2,
        name: "Arnold",
        info: {
            birth: "27-03-2000",
            birthplace: "Monaco"
        }
    }
];

const values = Obj.pluckNested(users, "id");
// [1, 2]

const values = Obj.pluckNested(users, "name");
// ["Lambou", "Arnold"]

const values = Obj.pluckNested(users, "info.birth");
// ["27-03-1995", "27-03-2000"]

const values = Obj.pluckNested(users, ["info", "birthplace"]);
// ["Bangangté", "Monaco"]
```

### 

### Arr.includes

The _Arr.includes_ method `true` if the array includes the given value and `false` otherwise. 

Method import

```typescript
import { Arr } from "@noreajs/common";
```

Method definition

```typescript
function includes(array: (string | number)[], value: string | number): boolean;
```

Method parameters

- **array**: array of string
- **value**: value

Examples

```typescript
const r = Arr.includes(["a", "b"], "c");
// false

const r = Arr.includes(["a", "b"], "a");
// true
```

### Arr.missing

The _Arr.missing_ method returns items in array **a** missing in array **b**. 

Method import

```typescript
import { Arr } from "@noreajs/common";
```

Method definition

```typescript
function missing(a: (string | number)[], b: (string | number)[]): (string | number)[];
```

Method parameters

- **a**: array of string
- **b**: array of string

Examples

```typescript
const r = Arr.missing(["a", "b"], ["c", "a"]);
// ["b"]

const r = Arr.missing(["a", "b"], ["a", "b"]);
// []
```

### 

## Strings & Numbers

### extractLanguageTag

The _extractLanguageTag_ method help you to extract language tag in a locale string.

Method import

```typescript
import { extractLanguageTag } from "@noreajs/common";
```

Method definition

```typescript
const extractLanguageTag: (value: string | undefined) => string;
```

Method parameters

- **value**: locale value

Examples

```typescript
const tag = extractLanguageTag("en-US");
// en

const tag = extractLanguageTag("fr_FR");
// fr

const tag = extractLanguageTag("en");
// en
```

### forceNumber

The _forceNumber_ method returns the numeric value of the given object and zero if the given object is not a number

Method import

```typescript
import { forceNumber } from "@noreajs/common";
```

Method definition

```typescript
const forceNumber: (value: any) => number;
```

Method parameters

- **value**: potential number

Examples

```typescript
const num = forceNumber("100");
// 100

const num = forceNumber(150.2);
// 150.20

const num = forceNumber("en");
// 0

const num = forceNumber("454i");
// 0
```

### isFilled

The _isFilled_ method return **true** the given value is null or undefined.

Method import

```typescript
import { isFilled } from "@noreajs/common";
```

Method definition

```typescript
const isFilled: (value: any) => boolean;
```

Method parameters

- **value**: value to check

Examples

```typescript
var a = null;
var b = undefined;
var c = 10;
var d = {
  who: "Is it a question?",
  ofCourseYes: "Oh.. Ok me",
};

isFilled(a);
// false

isFilled(b);
// false

isFilled(c);
// true

isFilled(d);
// true
```

### isLocaleValid

The _isLocaleValid_ method return **true** the given value is a valid locale string.

Method import

```typescript
import { isLocaleValid } from "@noreajs/common";
```

Method definition

```typescript
const isLocaleValid: (locale?: string | undefined) => boolean;
```

Method parameters

- **value**: locale string

Examples

```typescript
var a = null;
var b = undefined;
var c = "en";
var d = "fr-FR";
var e = "en_US";

isLocaleValid(a);
// false

isLocaleValid(b);
// false

isLocaleValid(c);
// true

isLocaleValid(d);
// true

isLocaleValid(e);
// true
```

### isQueryParamFilled

The _isQueryParamFilled_ method return **true** the given value is null or undefined and length > 0.

Method import

```typescript
import { isQueryParamFilled } from "@noreajs/common";
```

Method definition

```typescript
const isQueryParamFilled: (value: any) => boolean;
```

Method parameters

- **value**: value to check

Examples

```typescript
var a = null;
var b = undefined;
var c = 10;
var d = "";

isQueryParamFilled(a);
// false

isQueryParamFilled(b);
// false

isQueryParamFilled(c);
// true

isQueryParamFilled(d);
// false
```

### removeAllWhiteSpaces

The _removeAllWhiteSpaces_ method remove all white spaces in string

Method import

```typescript
import { removeAllWhiteSpaces } from "@noreajs/common";
```

Method definition

```typescript
const removeAllWhiteSpaces: (
  value: string,
  replacement?: string | undefined
) => string;
```

Method parameters

- **value**: given string
- **replacement**: optional replacement value

Examples

```typescript
const value = removeAllWhiteSpaces("100 50");
// 10050

const value = removeAllWhiteSpaces("    hello!     world");
// hello!world

const value = removeAllWhiteSpaces("family member", " and ");
// family and member
```

### replaceAllMatch

The _replaceAllMatch_ method replace all occurences of a searched string in another string.

Method import

```typescript
import { replaceAllMatch } from "@noreajs/common";
```

Method definition

```typescript
const replaceAllMatch: (
  value: string,
  search: RegExp,
  replacement: string
) => string;
```

Method parameters

- **value**: given string
- **search**: regular expression
- **replacement**: replacement value

Examples

```typescript
const num = replaceAllMatch("100", /0/g, "1");
// 111

const num = replaceAllMatch("Live in America", /i/g, "I");
// LIve In AmerIca
```
