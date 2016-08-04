# ES6 Guidelines 

## First things first!! Avoid the following at all cost

  - `eval` 
  - `setTimeout(string)` (Note: `setTimeout(function)` is acceptable), `setInterval(string)`
  - `alert` and  `confirm`,
  - `var`. Use `let` and `const` instead.
  - `==`. Use `===` instead.

## Variables

- All variables should be `camelCase`

- **STOP USING `var`**. Use `const` and `let` instead.

```js
const routes = true;
const username = getUsername();
const MY_FAV = 7;
const constObj = {"key": "value"};
constObj.key = "otherValue"; // This is valid!! 

let routes;
let length = 100;
```

- Use the following convention for macros : `__LIKE_THIS__`.

- Use the following convention for constants: `LIKE_THIS`.


## Hoisting and let/const

- Variables declared using `var` are hoisted to the top of their scope as are `const` and `let`, however the only difference is accessing `const` and `let` throws `ReferenceError` if 
  accessed before being initialized and `var` returns `undefined`.  Read more : http://jsrocks.org/2015/01/temporal-dead-zone-tdz-demystified/

```js
var x = 'outer scope';
(function() {
    console.log(x);     // Prints undefined
    var x = 'inner scope';
}());

let x = 'outer scope';
(function() {
    console.log(x);     // Will throw ReferenceError
    let x = 'inner scope';
}());
```


# ES6 Class 

- A `Class` declaration should always be in `PascalCase` convention, with first letter in Uppercse. Also note that this is the **only construct** that should start with Uppercase.


```js
class Point {
    // declare a const (non changing value)
    const MY_CONST = 'string';

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return `(${this.x}, ${this.y})`;
    }
}

class ColorPoint extends Point {
    constructor(x, y, color) {
        super(x, y);
        this.color = color;
    }
    toString() {
        return super.toString() + ' in ' + this.color;
    }
}

```

- If a constructor is required, make sure it is the **first function** that is defined

- Use the below naming conventions for class constructs :

    - Private variables : `let _privateVar`  Note: No inherent support yet! (http://www.2ality.com/2016/01/private-data-classes.html)
    - Private methods  : `_privateFunc() { /*Function Body*/ }` 
    - Public variables  : `let publicVar;` 
    - Public methods  : `publicFunc() {/* Function Body*/ }` 
    - Getter methods : `get name() { return this._name.toUpperCase(); }`
    - Setter methods : `set name(newName) { this._name = newName; }`
                      
- Use the below order of declaration in a Class.

  - `constructor`

  - public `get/set` accessors, grouped by name,

  - public methods,

  - private `get/set` accessors (with a `_` prefix), grouped by name,

  - private methods (with a `_` prefix),

  - public static methods,

  - private static methods (with a `_` prefix).


```js
class Foo extends Bar {
  // If your transpiler or environment support ES7 class properties:
  let bax = null;
  let baw = 1337;

  constructor() { // constructor
    ...
  }

  get baz() { // public getter
    ...
  }

  set baz(val) { // public setter
    ...
  }

  doFoo() { // public method
    ...
  }

  get _baz() { // private getter
    ...  
  }

  set _baz(val) { // private setter
    ...
  }

  _doFoo() { // private method
    ...  
  }

  // If your transpiler or environment support ES7 class properties:
  static theFoo = 'theBar';

  static doFoo() { // public static method
    ...
  }

  static _doFoo() { // private static method
    ...  
  }
}

```

 
- If nothing is required to be done in `constructor`, dont declare it. Class already has a default constructor.

```js
// bad
class Person {
  constructor() {}
  run() {
  }
}

// good. Just dont declare it!
class Person {
    run(){
    }
}
```

- Return `this` from functions to allow method chaning:

```js
class Line  {
    color() {
        // Color the line
        return this;
    }

    setHeight(height) {
        this.height = height;
        return this;
    }
}

const blueLine = new Line();

blueLine.setHeight(5).color();
```

- Write a `toString` method for your class, if required:

```js
class Person {
  constructor(options = {}) {
    this.name = options.name || "Superman";
  }
  getName() {
    return this.name;
  }

  toString() {
    return `${this.getName()`;
  }
}
```
 

## Objects

- An `Object` declaration should always be in `camelCase`, with first letter in Lowercase.

- Create objects using the Object syntax literal. **Avoid** `new Object()`

```js
// bad
const obj = new Object();
const obj = Object.create(Object.prototype);

// good
const obj = {
  key1: value1,             // colon immediately after key. Comma immediately after value. AVOID key1 : value1 ,
  'foo-bar': 7,             // Put quote only for such keys. Not required for all keys!
  key2: value2,             // Note the last comma. It helps in adding more key-value pairs and helps in git diffs
};
```

- Use the below conventions for defining objects: 
    - `:` immediately after key and `,` after value 
    - Use `quote` only for keys with `-` and other special chars

- Use object method shorthand for functions

```js
// bad
const atom = {
  value: 1,
  addValue: function (value) {
    return atom.value + value;
  },
};

// good
const atom = {
  value: 1,
  addValue(value) {
    return atom.value + value;
  },
};
```

- Use property value shorthand. 

```js
const veryLongVarName1 = 57;
const veryLongVarName2 = 81;

// bad
const obj = {
  veryLongVarName1: veryLongVarName1,
  veryLongVarName2: veryLongVarName2,
};

// good
const obj = {
  veryLongVarName1,
  veryLongVarName2,
};
```
  

## Arrays

- An `Array` declaration should always be in `camelCase`, with first letter in Lowercase.

- Create arrays using the Array syntax literal. **Avoid** `new Array()`

```js
// bad
const a = new Array();

// good
const a = [];
```

- Use `spread` operator where you want to use the values of Array

```js
// bad
myFunction.apply(null, arr);

// good
myFunction(...arr);

// Copy array
var arr = [1,2,3];
var arr2 = [...arr]; // like arr.slice()
arr2.push(4); // arr2 becomes [1,2,3,4], arr stays unaffected

// For taking variable number of arguments
function sort(...args) {
  // Use args here to get arguments ;
}
```

## Destructuring
- Use object destructuring to avoid use of temporary variables

```js
let options = {
    x: 500,
    url: '/api',
}

//bad
const x = options.x; const url = options.url;

//good
const { x, url } = options;  // destructure x and url from options!!


const arr = [1, 2, 3, 4];

//bad
const first = arr[0]; const second = arr[1];

//good
const [first, second] = arr;

```

## Strings

- A Static `string` declaration should always be in **single quotes `'`** AVOID double quotes.
- A Dynamic `string` declaration should always be in **backticks ```**

```js
//bad
const fname = "John"; const lname = "Doe"
//good
const fname = 'John'; const lname = 'Doe'

// bad
const fullName = 'Mr' + fname + ' ' + lname;  
// good
const fullName = `Mr ${fname} ${lname}`;
```


## Functions

- Use regular function declarations. **AVOID** function expressions (instead use the Arrow functions) 

```js
// bad
const area = function () {
};
 
// good
function area() {
}

// arrow function
const area = (len) => { }
```

- Use default arguments as much as possible!

```js
// bad
function area(len){
  len = len || 0;
  return len*len;
}
function render(opts) {
  opts = opts || {};
}

// good
function area(len = 0){
    return len*len;
}
function render(opts = {}) {
  // user opts here
}

```


- Use Arrow functions when anonymous function is required.

```js
// bad
[1, 2, 3].map(function (x) {
  return x * x;
});

// good
[1, 2, 3].map((x) => {
  return x * x;
});

// still better
[1, 2, 3].map((x) => x * x); 
```

- Use the following guide to better understand Arrow functions

```js
(optionalArgsToFunction) => {DoSomething}; 
                OR 
var functionName = (optionalArgsToFunction) => {DoSomething};

// The above is equivalent to
var functionName = function(optionalArgsToFunction) {
    DoSomething;
};
```

- Always use paranthesis for arrow function parameter.

```js
// bad
const square = x => x * x;

// good
const square = (x) => 3 * x;
```

- Use Arrow functions when you want to bind `this`. **Avoid** using `var that = this` as much as possible.

```js
//  bad
$('.current-time').each(function () {
  var that = this;
 
  setTimeout(function () {
    $(that).text(Date.now());
  }, 1000);
});

// good
$('.current-time').each(function () {
  setTimeout(() => $(this).text(Date.now()), 1000);
});




// bad
function foo() {
  const that = this;
  return function () {
    console.log(that);
  };
}

// good
function foo() {
  return () => {
    console.log(this);
  };
}
```

## Properties

- Always use Dot notation for getting properties

```js
const obj = {
    key: value,
}

// bad
obj['key'] = value;

// good
obj.key = value; // Note: For some keys you will have to use the subscript notation. But try to avoid defining such keynames.
```


## Syntax

- **NEVER EVER** use tab. Please configure your editor to convert tabs to spaces.

- **ALWAYS** use 4-char space instead of 2.

```js
// bad
Class Person{
<tab>let _v;
}

// good
Class Person{
<4 spaces>let _v;
}
```

- Use `/* ... */` for multiline comments

- Use `//` for single line comments

- Always start the `{` of `if` / `for` / `while` etc on the **same line** 

```js
// bad
if (true) 
{
  ...
}

// good
if(true) {
  ...
}
```

- Always use a block, even if the block is of single statement.

```js
// bad
if(true)
 return "Hello;

// good
if(true) {
  return "Hello";
}
```

- Always use semicolons to end the statement. 

```js
// bad
function square(x) { return x * x }

// good
function square(x) { return x * x; }

```


# Utilities

- Use forEach/map more instead of `for`, `for in` etc. With ES6 there is hardly any need for using traditional `for` loop.

```js
const scores = [12, 42, 27, 18];
let total = 0;

// bad
for(i = 0; i < scores.length; i++) {
    total = total + scores[i];
}

// good
scores.forEach( (score) => total += score);

```

- Use forEach() / map() / every() / filter() / find() / findIndex() / reduce() / some() / ... to iterate over arrays.

- Use Object.keys() / Object.values() / Object.entries() to produce arrays so you can iterate over objects.

## ES6 modules

-- Always use ES6 modules instead of `require`

```js
// bad
const VStudent = require('student');

// good
import VStudent from 'student';
```

- Dont `export` mutables!!

```js
// bad
let color = 'blue';
export { color }

// good
const color = 'blue';
export { color }
```

- Always export at least one default and that **should match** the name of the file

```js
//person.js
export default class Person{}

        OR
//person.js
class Person(){
}
export default Person;

```

## undefined

- Always use `void 0` where you want to use `undefined`

```js
// bad
if(x === undefined) {
  ...
}

// good
if(x === void 0) {
  ...
}
```


## Type Casting 
- Use the following for casting to `String` / `Number` etc

```js
                // Strings
const score = 9;
// bad
const totalScore = score + ''; // invokes this.reviewScore.valueOf()
// bad
const totalScore = score.toString(); // isn't guaranteed to return a string

// good
const totalScore = String(score);


                // Number 

const foo = '4';

// bad
const bar  = parseInt(foo);

// good
const bar = parseInt(foo, 10);

// good
const bar = Number(foo);

                // Boolean 

const truth = 0;

// good
const isTrue = Boolean(truth);

```
## Promises

- Consider using `bluebird`, instead of Native `Promise`.


## Resources



