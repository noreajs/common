# Common tools for Norea.Js

The package include many functions that are used by the Norea.Js itself. Feel free to use them in your own applications or projects if you find them useful. This package does not have any dependencies.

## Arrays & Objects

### assignNestedProperty

The _assignNestedProperty_ method allows you to inject an attribute into an object no matter the level of nesting.

#### Method import

```typescript
import { assignNestedProperty } from "@noreajs/common";
```

#### Method definition

```typescript
const assignNestedProperty: (
  obj: any,
  keyPath: Array<string>,
  value: any
) => void;
```

#### Method parameters

- **obj**: object into which you want to inject the data
- **keyPath**: table containing in order each step of the path to the attribute
- **value**: value to assign

#### Example

```typescript
const user = {
  name: "John",
  email: "john-conor@sky.net",
};

assignNestedProperty(user, ["country", "city", "name"], "Newyork");

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

### readNestedProperty

The _readNestedProperty_ method help you to read an attribute into an object no matter the level of nesting.

#### Method import

```typescript
import { readNestedProperty } from "@noreajs/common";
```

#### Method definition

```typescript
const readNestedProperty: (obj: any, keyPath: Array<string>) => any;
```

#### Method parameters

- **obj**: the object that contains the valu
- **keyPath**: table containing in order each step of the path to the attribute

#### Example

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

const cityName = readNestedProperty(user, ["country", "city", "name"]);
// Newyork

```

### checkRequiredKeys

The _checkRequiredKeys_ method returns the attributes of the given array that have not been filled in and the target object.

#### Method import

```typescript
import { checkRequiredKeys } from "@noreajs/common";
```

#### Method definition

```typescript
// typescript
function checkRequiredKeys<T, K = keyof T>(attrs: K[], target: T): K[];

// javascript
function checkRequiredKeys(attrs, target);
```

#### Method parameters

- **attrs**: table of _target_'s required attributes
- **target**: object

#### Example

```typescript
const user = {
  name: "Lambou",
  nickname: "The Beast",
  jobTitle: "Big Food personal coach",
};

const keys = checkRequiredKeys(["name", "nickname"], user);
// []

const keys = checkRequiredKeys(["birthdate", "birthplace", "name"], user);
// ["birthdate", "birthplace"]
```

## Strings & Numbers

### extractLanguageTag

The _extractLanguageTag_ method help you to extract language tag in a locale string.

#### Method import

```typescript
import { extractLanguageTag } from "@noreajs/common";
```

#### Method definition

```typescript
const extractLanguageTag: (value: string | undefined) => string;
```

#### Method parameters

- **value**: locale value

#### Examples

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

#### Method import

```typescript
import { forceNumber } from "@noreajs/common";
```

#### Method definition

```typescript
const forceNumber: (value: any) => number;
```

#### Method parameters

- **value**: potential number

#### Examples

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

#### Method import

```typescript
import { isFilled } from "@noreajs/common";
```

#### Method definition

```typescript
const isFilled: (value: any) => boolean;
```

#### Method parameters

- **value**: value to check

#### Examples

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

#### Method import

```typescript
import { isLocaleValid } from "@noreajs/common";
```

#### Method definition

```typescript
const isLocaleValid: (locale?: string | undefined) => boolean;
```

#### Method parameters

- **value**: locale string

#### Examples

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

#### Method import

```typescript
import { isQueryParamFilled } from "@noreajs/common";
```

#### Method definition

```typescript
const isQueryParamFilled: (value: any) => boolean;
```

#### Method parameters

- **value**: value to check

#### Examples

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

#### Method import

```typescript
import { removeAllWhiteSpaces } from "@noreajs/common";
```

#### Method definition

```typescript
const removeAllWhiteSpaces: (
  value: string,
  replacement?: string | undefined
) => string;
```

#### Method parameters

- **value**: given string
- **replacement**: optional replacement value

#### Examples

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

#### Method import

```typescript
import { replaceAllMatch } from "@noreajs/common";
```

#### Method definition

```typescript
const replaceAllMatch: (
  value: string,
  search: RegExp,
  replacement: string
) => string;
```

#### Method parameters

- **value**: given string
- **search**: regular expression
- **replacement**: replacement value

#### Examples

```typescript
const num = replaceAllMatch("100", /0/g, "1");
// 111

const num = replaceAllMatch("Live in America", /i/g, "I");
// LIve In AmerIca
```
