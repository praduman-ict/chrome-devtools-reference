# Console Panel: Logging, Debugging, and JavaScript Execution

The Console panel is your JavaScript REPL (Read-Eval-Print Loop) and debugging interface. It allows you to execute arbitrary JavaScript, view application logs, and access powerful utility functions for DOM inspection and manipulation.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Console Methods](#console-methods)
3. [Styling Console Output](#styling-console-output)
4. [Organizing Messages](#organizing-messages)
5. [Filtering and Searching](#filtering-and-searching)
6. [Console Utility Functions](#console-utility-functions)
7. [Performance Profiling](#performance-profiling)
8. [Advanced Debugging](#advanced-debugging)
9. [Tips and Best Practices](#tips-and-best-practices)

---

## Getting Started

### Opening the Console
- Press `Ctrl+Shift+J` (Windows/Linux) or `Cmd+Option+J` (macOS)
- Or press `F12` and click the **Console** tab
- Or press `Ctrl+Shift+I` and click **Console** tab

### Executing JavaScript
1. Click in the console input area (bottom)
2. Type JavaScript code
3. Press `Enter` to execute
4. Result appears above with a blue `>` arrow

**Multi-line Input:**
- Press `Shift+Enter` to create new lines
- Useful for:
  - Multi-statement commands
  - Loop code blocks
  - Function definitions
  - Complex expressions

```javascript
// Example multi-line input
for (let i = 0; i < 3; i++) {
  console.log('Iteration ' + i);
}
// Output:
// Iteration 0
// Iteration 1
// Iteration 2
```

### Accessing Page Context
Code executed in the console has **full access** to the page's JavaScript context:

```javascript
// Access global variables
window                    // Global object
document                  // Page DOM
console                   // Console API
// Access page's custom code
appVariable              // If exists on window
myFunction()             // If exists on window
```

---

## Console Methods

### Basic Logging

#### `console.log()`
General-purpose logging. Outputs arguments to console.

```javascript
console.log('Hello World');
console.log('Value:', 42);
console.log('Object:', {name: 'John', age: 30});
console.log(document.body);  // DOM elements
```

**Log Level:** Info

#### `console.info()`
Similar to `console.log()`. Used for informational messages.

```javascript
console.info('Application started');
console.info('Version:', '1.0.0');
```

**Log Level:** Info

#### `console.warn()`
Warning-level messages (yellow background in console).

```javascript
console.warn('Deprecated API used');
console.warn('Memory usage high:', 256);
```

**Log Level:** Warning

#### `console.error()`
Error-level messages (red background in console).

```javascript
console.error('Failed to load resource');
console.error('Error:', new Error('Custom error'));
```

**Log Level:** Error

### Counting and Timing

#### `console.count([label])`
Counts how many times code at a location is called.

```javascript
// In a loop or function that's called multiple times
console.count('iterations');     // iterations: 1
console.count('iterations');     // iterations: 2
console.count('iterations');     // iterations: 3

// Reset counter
console.countReset('iterations');
console.count('iterations');     // iterations: 1
```

**Use Cases:**
- Track function call frequency
- Find unexpected repeated calls
- Monitor loop iterations

#### `console.time([label])` and `console.timeEnd([label])`
Measure execution time between two points.

```javascript
console.time('calculation');

// Some code to measure
let sum = 0;
for (let i = 0; i < 1000000; i++) {
  sum += i;
}

console.timeEnd('calculation');
// Output: calculation: 2.5ms
```

**Use Cases:**
- Performance bottleneck identification
- Algorithm comparison
- Load time measurement

### Stack Traces

#### `console.trace([label])`
Prints a stack trace showing the call stack.

```javascript
function third() {
  console.trace('Stack at third()');
}

function second() {
  third();
}

function first() {
  second();
}

first();
// Output: Stack trace showing first() → second() → third()
```

**Stack Trace Shows:**
- Function names
- File names
- Line numbers
- Call order
- Click to jump to source in Sources panel

---

## Styling Console Output

Make console output more visually distinct using CSS styles.

### CSS Styling with %c

Use `%c` placeholder in console.log() to apply CSS:

**Simple Styled Message:**
```javascript
const style = 'background-color: darkblue; color: white; font-size: 1.5em; padding: 5px;';
console.log('%cHooray!', style);
```

**Multiple Styled Sections:**
```javascript
console.log(
  '%cHello %cWorld',
  'background-color: blue; color: white;',
  'background-color: orange; color: black;'
);
// First %c applies first style, second %c applies second style
```

**Complex Styling:**
```javascript
const style = 'background-color: darkblue; color: white; font-style: italic; border: 5px solid hotpink; font-size: 2em;';
console.log('%c✓ Success!', style);
```

**Valid CSS Properties:**
- `background-color`
- `color`
- `font-size`
- `font-weight`
- `font-style`
- `border`
- `padding`
- `margin`
- Most other CSS properties

### ANSI Color Codes
Alternative to CSS, using ANSI escape sequences:

```javascript
// Bold green text
console.log('\x1B[1;32mSuccess\x1B[m');

// Bold yellow on red background
console.log('\x1B[41;93;1mError\x1B[m');

// Blue text
console.log('\x1B[34mInfo\x1B[m');
```

**ANSI Code Format:** `\x1B[<code>m<text>\x1B[m`

**Common Codes:**
- `31` = Red
- `32` = Green
- `33` = Yellow
- `34` = Blue
- `41` = Red background
- `43` = Yellow background
- `1` = Bold
- `4` = Underline

---

## Organizing Messages

### console.group() and console.groupEnd()

Group related messages together with visual hierarchy:

```javascript
const label = 'Application Load';
console.group(label);
  console.log('Loading data...');
  console.log('Parsing response...');
  console.log('Ready!');
console.groupEnd(label);
```

Output appears with expandable group.

### console.groupCollapsed()

Same as group, but **collapsed by default**:

```javascript
console.groupCollapsed('Debug info');
  console.log('Detailed information');
  console.log('More details');
  console.log('Even more details');
console.groupEnd();
```

Useful for hiding verbose debug output.

### Nesting Groups

Groups can be nested indefinitely:

```javascript
console.group('Timeline 1: 2024');
  console.log('Q1');
  console.group('Q2');
    console.log('June');
    console.log('July');
  console.groupEnd();
  console.log('Q3');
console.groupEnd();
```

Creates expandable tree structure in console.

### console.table(array [, columns])

Display array of objects as formatted table:

```javascript
const people = [
  { name: 'Alice', age: 25, city: 'NYC' },
  { name: 'Bob', age: 30, city: 'LA' },
  { name: 'Charlie', age: 28, city: 'Chicago' }
];

console.table(people);
```

Output shows columns and rows with sortable headers.

**Selective Columns:**
```javascript
// Show only 'name' and 'age' columns
console.table(people, ['name', 'age']);
```

**Use Cases:**
- Visualize JSON data
- Compare object properties
- Debug array contents
- Export tabular data

---

## Filtering and Searching

### Filter by Log Level

DevTools assigns severity levels to each message:

| Level | Methods | Color |
|-------|---------|-------|
| Verbose | — | Grey |
| Info | `log()`, `info()` | Blue |
| Warning | `warn()` | Yellow |
| Error | `error()` | Red |

**Filtering:**
1. Console panel has filter icons at top
2. Click to toggle each level
3. Shows/hides messages of that level

**Example:**
- Click warning icon to show only warnings
- Click error icon to show only errors
- Multiple selections combine with OR logic

### Filter by URL

Show messages from specific scripts:

```javascript
// In the filter input:
url:https://example.com/app.js
```

Shows only messages from that script.

**Negative Filter:**
```javascript
-url:https://external.com/lib.js
```

Hides messages from that URL.

**Domain Filter:**
```javascript
url:https://example.com
```

Shows messages from any script on that domain.

### Search Console Messages

`Ctrl+F` (Windows/Linux) or `Cmd+F` (macOS) to search:

1. Opens search bar at bottom of console
2. Type search query
3. Highlights matching messages
4. Use arrow buttons to navigate

**Search Operators:**
- Exact text match
- No regex by default
- Case-insensitive by default

---

## Console Utility Functions

The console provides special functions not available in regular JavaScript:

### DOM Selection: $ and $$

#### `$(selector [, startNode])`
Shortcut for `document.querySelector()`. Returns **first** matching element.

```javascript
$('p')                    // First paragraph
$('.active')              // First element with class 'active'
$('#header')              // Element with ID 'header'
$('[type="submit"]')      // First submit button
$('div.item:nth-child(2)') // CSS selector support
```

**With startNode:**
```javascript
// Search only within a container
$('p', document.querySelector('.container'))
```

**Result Actions:**
```javascript
let elem = $('p');
elem.textContent = 'New text';    // Modify
$0.scrollIntoView();              // Scroll to element
```

#### `$$(selector [, startNode])`
Shortcut for `document.querySelectorAll()`. Returns **all** matching elements as array.

```javascript
$$('p')                   // All paragraphs
$$('.item')               // All items
$$('li')                  // All list items

// Iterate and process
$$('button').forEach(btn => {
  console.log(btn.textContent);
});

// Get count
$$('a').length
```

**Array Methods Available:**
```javascript
$$('img')[0]              // First image
$$('img').length          // Count
$$('img').filter(...)     // Filter array
$$('img').map(...)        // Transform array
```

### Element Reference: $0, $1, etc.

Access recently selected elements in Elements panel:

```javascript
$0      // Currently selected element
$1      // Previously selected element
$2      // 2nd previous selection
$3      // 3rd previous selection
$4      // 4th previous selection
```

**Use Cases:**
```javascript
// Element selected in Elements panel
$0.parentElement          // Get parent
$0.querySelectorAll('a')  // Get children
$0.classList.add('test')  // Modify class
$0.style.display = 'none' // Hide element
```

### Object Inspection: copy()

Copy string representation of object to clipboard:

```javascript
copy($0)                  // Copy selected element
copy(someObject)          // Copy object
copy(JSON.stringify(data)) // Copy formatted JSON
```

**Useful for:**
- Sharing object data
- Copying large JSON structures
- Exporting console results to editor

### Debugging: debug() and undebug()

#### `debug(functionName)`
Pause execution when function is called.

```javascript
function getData() {
  // Some code
}

debug(getData);           // Set breakpoint on function call
getData();                // Pauses here
```

Equivalent to setting a line-of-code breakpoint on first line.

#### `undebug(functionName)`
Remove function breakpoint:

```javascript
undebug(getData);         // Remove breakpoint
```

### Object Inspection: dir() and dirxml()

#### `dir(object)`
Display object properties in expandable list format.

```javascript
dir(document.body)        // Show body properties
dir(window)               // Show global properties
```

Similar to `console.dir()` method.

#### `dirxml(object)`
Display object as XML/HTML in Elements panel format.

```javascript
dirxml(document.body)     // Show HTML structure
```

### Inspect: inspect()

Open object in appropriate panel:

```javascript
inspect($0)               // Open element in Elements panel
inspect(document.body)    // Open body in Elements panel
inspect(someFunction)     // Open function in Sources panel
```

Useful for quick navigation between panels.

### Event Listeners: getEventListeners()

Get all event listeners attached to element:

```javascript
getEventListeners($0)           // Listeners on selected element
getEventListeners(document)     // Listeners on document
getEventListeners(window)       // Listeners on window

// Returns object:
// {
//   click: [Listener, Listener, ...],
//   change: [Listener, ...],
//   ...
// }
```

**Expand Listener to See:**
- Handler function
- Event options (capture, once, passive)
- File and line number
- Click handler name to jump to source

### Object Properties: keys() and values()

#### `keys(object)`
Get array of object property names:

```javascript
let person = {
  name: 'Alice',
  age: 30,
  city: 'NYC'
};

keys(person)              // ['name', 'age', 'city']
```

#### `values(object)`
Get array of object property values:

```javascript
values(person)            // ['Alice', 30, 'NYC']
```

### Monitor Function Calls: monitor()

Log function calls with arguments:

```javascript
function add(a, b) {
  return a + b;
}

monitor(add);             // Monitor function
add(2, 3);                // Logs: add called with arguments: 2, 3
add(5, 7);                // Logs: add called with arguments: 5, 7

unmonitor(add);           // Stop monitoring
```

Output shows:
- Function name
- Arguments passed
- Each call logged

### Monitor Events: monitorEvents()

Log events fired on element:

```javascript
monitorEvents($0)         // Monitor all events on selected element
monitorEvents(window, "resize")  // Monitor specific event
monitorEvents(document, ["click", "submit"])  // Multiple events
```

**Event Types (Shortcuts):**
```javascript
monitorEvents($0, "mouse")    // mousedown, mouseup, click, dblclick, etc.
monitorEvents($0, "key")      // keydown, keyup, keypress, textInput
monitorEvents($0, "touch")    // touchstart, touchmove, touchend, touchcancel
monitorEvents($0, "control")  // resize, scroll, zoom, focus, blur, etc.
```

**Stop Monitoring:**
```javascript
unmonitorEvents($0)           // Stop all monitoring
unmonitorEvents($0, "click")  // Stop specific event
```

### Query Objects: queryObjects()

Find all instances of a constructor:

```javascript
queryObjects(Promise)         // All Promise instances
queryObjects(HTMLElement)     // All DOM elements
queryObjects(MyClass)         // Instances of custom class
```

**Returns:** Array of matching objects

**Use Cases:**
- Find memory leaks (too many objects)
- Debug object instantiation
- Verify object creation

---

## Performance Profiling

### console.time() and console.timeEnd() (Detailed)

More detailed timing with multiple measurements:

```javascript
console.time('operation');

// Do some work
for (let i = 0; i < 1000000; i++) {
  Math.sqrt(i);
}

console.time('nested');  // Can nest measurements
// Do more work
console.timeEnd('nested');  // Output: nested: 1.2ms

console.timeEnd('operation');  // Output: operation: 3.5ms
```

**Tips:**
- Use descriptive labels
- Measure specific code sections
- Compare before/after optimization

### profile() and profileEnd()

CPU profiling from console:

```javascript
profile('Profile 1');     // Start profiling

// Run some code
expensiveFunction();

profileEnd('Profile 1');  // Results in Performance panel
```

**Output:**
- CPU profile in Performance panel
- Shows function call times
- Identifies bottlenecks

---

## Advanced Debugging

### Breakpoints in Console
Break on function calls using `debug()`:

```javascript
function processData(data) {
  // Process...
}

debug(processData);       // Set breakpoint
processData({x: 1});      // Pauses here
```

Similar to debugger breakpoints but easier from console.

### Modify Running Code
Change variables and re-execute during debugging:

```javascript
// Code is paused at a breakpoint
// In console:
variable = 42;            // Modify variable
anotherVar = 'test';      // Set new variable
someFunction();            // Execute code with new values
```

Useful for testing different scenarios without restarting.

### Execute Code Before Other Code
Use console to run setup code before application code:

```javascript
// Page loads with blank console
window.myDebugFlag = true;  // Set flag
window.testData = {...};    // Define test data
// Now navigate or trigger application code
// Application can read your test data
```

---

## Tips and Best Practices

### Best Practices

1. **Use Appropriate Log Levels**
   - `info()` or `log()` for normal flow
   - `warn()` for potential issues
   - `error()` for actual errors

2. **Remove Console Logs in Production**
   - Use build tools to strip console calls
   - Or check environment: `if (process.env.NODE_ENV === 'development')`

3. **Use Groups for Complex Logs**
   - Organize related logs
   - Makes console easier to read
   - Useful for multi-step processes

4. **Use console.table() for Data**
   - Better than console.log() for arrays/objects
   - Easier to compare values
   - Sortable columns

5. **Use Meaningful Labels**
   - `console.time('fetch-data')` not `console.time('t1')`
   - Makes profiling results clear

6. **Monitor Events During Development**
   - Use `monitorEvents()` to understand interaction flow
   - Remove when done debugging

### Performance Tips

- **Large Objects:** `table()` is slower than `log()`
- **High-Frequency Logs:** Disable in production (performance impact)
- **Filtered Logs:** Filter by URL to reduce console spam
- **Search:** Use Ctrl+F to find messages instead of scrolling

### Common Console Patterns

**Quick Testing:**
```javascript
const test = () => console.log('Test!');
test();
```

**Conditional Logging:**
```javascript
const debug = window.DEBUG || false;
if (debug) console.log('Debug info');
```

**Performance Tracking:**
```javascript
console.time('api-call');
// API call here
console.timeEnd('api-call');
```

**Object Inspection:**
```javascript
const obj = {a: 1, b: 2};
console.table(obj);
console.log(keys(obj), values(obj));
```

---

## Summary

The Console panel is essential for:
- **Executing** arbitrary JavaScript
- **Logging** application state and behavior
- **Debugging** with utility functions
- **Profiling** performance
- **Inspecting** DOM and objects
- **Testing** code quickly

Master console utilities to debug faster and understand your application deeply.

---

## Related Docs
- [Elements Panel - DOM Inspection](01-elements.md)
- [Sources Panel - Debugging](03-sources.md)
