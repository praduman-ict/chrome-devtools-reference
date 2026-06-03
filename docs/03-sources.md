# Sources Panel: JavaScript Debugging and Development

The Sources panel is the primary tool for debugging JavaScript. It enables you to set breakpoints, step through code, inspect variables and call stacks, and understand program flow.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Viewing Source Code](#viewing-source-code)
3. [Breakpoints](#breakpoints)
4. [Stepping Through Code](#stepping-through-code)
5. [Inspecting Variables](#inspecting-variables)
6. [Call Stack and Frames](#call-stack-and-frames)
7. [Exception Handling](#exception-handling)
8. [Advanced Techniques](#advanced-techniques)
9. [Code Organization](#code-organization)
10. [Tips and Tricks](#tips-and-tricks)

---

## Getting Started

### Opening the Sources Panel
- Press `Ctrl+Shift+I` (Windows/Linux) or `Cmd+Option+I` (macOS)
- Click the **Sources** tab
- Or use F12 then click Sources

### Sources Panel Layout

The Sources panel has three main areas:

1. **File Navigator** (left): Shows all scripts loaded by the page
2. **Code Editor** (center): Displays source code with line numbers
3. **Debug Sidebar** (right): Shows breakpoints, call stack, scope, watches

---

## Viewing Source Code

### File Navigator
The left panel shows all loaded JavaScript files:

- **Domain folders**: Shows which domain each file came from
- **Expand folders**: Click arrows to expand/collapse
- **Select file**: Click filename to view source

**File Organization:**
```
example.com
├─ index.html
├─ app.js
└─ lib/
   ├─ utils.js
   └─ api.js
cdn.example.com
├─ library.min.js
├─ framework.js
```

### Source Code Editor

**Features:**
- Line numbers on left
- Color syntax highlighting
- Hover over variables to see values (when paused)
- Click line numbers to set breakpoints

**Search in File:**
- `Ctrl+F` opens search within current file
- `Ctrl+G` jump to specific line number
- `Ctrl+H` find and replace

---

## Breakpoints

Breakpoints pause execution at specific points, allowing you to inspect state.

### Line-of-Code Breakpoints

**Set Breakpoint:**
1. Click line number in code editor
2. Blue marker appears on line number
3. Execution pauses at that line

**Disable Breakpoint:**
- Right-click breakpoint → Disable
- Line number becomes hollow circle
- Code still runs past line (not paused)

**Remove Breakpoint:**
- Click breakpoint marker again
- Or right-click → Delete

**Breakpoint Appearance:**
- **Blue circle**: Active breakpoint
- **Hollow circle**: Disabled breakpoint
- **Red circle**: Uncaught exception breakpoint

### Conditional Breakpoints

Pause only when a condition is true:

**Set Conditional Breakpoint:**
1. Right-click line number
2. Select **Add conditional breakpoint**
3. Enter JavaScript expression
4. Press Enter

**Example Expressions:**
```javascript
count > 10                 // Pause when count exceeds 10
user.id === 42            // Pause for specific user
typeof data !== 'object'  // Pause when condition true
index === 0 || index === 999  // Complex conditions
```

**When Paused:**
- Condition evaluated using current scope
- Only stops if condition evaluates to truthy
- Very powerful for debugging loops

**Edit Condition:**
- Right-click breakpoint → Edit breakpoint
- Modify expression and press Enter

### Logpoint (Conditional Log)

Log message without pausing:

**Set Logpoint:**
1. Right-click line number
2. Select **Add logpoint**
3. Enter message with expressions
4. Every execution logs message

**Example:**
```javascript
User: ${user.name}, Count: ${count}
```

When line executes:
```
User: Alice, Count: 5
User: Bob, Count: 12
```

**Use Cases:**
- Non-intrusive logging
- Avoid modifying code
- See execution without pausing
- Performance monitoring

### DOM Mutation Breakpoints

Pause when DOM changes (see [Elements Panel](01-elements.md)):

- Subtree modifications
- Attribute changes
- Node removal

### Event Listener Breakpoints

Pause when specific events fire:

**Common Categories:**
- Mouse events (click, mouseover, mousedown)
- Keyboard events (keydown, keyup, input)
- Touch events (touchstart, touchend)
- Pointer events (pointerdown, pointerup)
- UI events (load, unload, focus, blur, scroll, resize)
- Clipboard events (copy, paste)
- Animation events (animationstart, animationend)

**Set Event Breakpoint:**
1. Sources panel → Breakpoints section (right)
2. Expand "Event Listener Breakpoints"
3. Check event types you want to break on

When any element fires that event, execution pauses.

### XHR/Fetch Breakpoints

Pause on network requests matching URL pattern:

**Set XHR Breakpoint:**
1. Breakpoints section → XHR/Fetch Breakpoints
2. Click "+" to add pattern
3. Enter URL substring or pattern

**Examples:**
```
/api/         # Matches all requests to /api/...
.json         # Matches all .json requests
example.com   # Matches requests to example.com
```

**When Request Matches:**
- Execution pauses before request sent
- Inspect request headers and body
- Modify request (some cases)
- Resume to send request

### Function Breakpoints

Pause when specific function is called:

**From Console:**
```javascript
debug(myFunction);        // Pauses when function called
debug(MyClass.method);    // Also works for methods
undebug(myFunction);      // Remove breakpoint
```

Equivalent to setting breakpoint on first line of function.

### Pause on Exceptions

Pause execution when errors occur:

**Controls in Breakpoints Section:**

**Pause on uncaught exceptions:**
- Pauses only on errors not caught by try-catch
- Useful for critical errors

**Pause on caught exceptions:**
- Pauses on all exceptions, even if caught
- More aggressive debugging
- Useful for finding hidden errors

**Setting:**
1. Breakpoints section → Pause on exceptions
2. Check one or both checkboxes
3. When enabled, blue icon appears on bottom right of Sources panel

---

## Stepping Through Code

When paused at breakpoint, use stepping controls:

### Step Over (F10)
Execute current line and move to next line.

**Use When:**
- Line contains function call you don't need to debug
- Line contains loop you want to skip
- Want to stay in current function

```javascript
function demo() {
  let x = 1;           // Breakpoint here
  getValue();          // Step over (don't enter function)
  console.log(x);      // Now paused here
}
```

### Step Into (F11)
Enter the function call on current line.

**Use When:**
- Function call is related to bug
- Want to see what function does
- Need to debug the function

```javascript
function demo() {
  let x = 1;
  getValue();          // Step into (enter function)
  // Now inside getValue() at first line
}
```

### Step Out (Shift+F11)
Execute rest of current function and return to caller.

**Use When:**
- Entered function but it's not relevant
- Want to finish function and return to caller
- Realized you stepped into wrong function

```javascript
function outer() {
  inner();             // Called step into here
  console.log('done'); // Want to get back here
}

function inner() {
  // Paused here
  // Step out to return to outer()
  // Now paused at console.log('done')
}
```

### Resume (F8)
Continue execution until next breakpoint or error.

**Use When:**
- Finished inspecting current breakpoint
- Want to run to next breakpoint
- Know there are more breakpoints ahead

### Continue to Here (Right-click Line)
Jump to specific line without setting breakpoint.

**How:**
1. Right-click line of code
2. Select **Continue to here**
3. Execution runs until that line
4. Pauses at that line

**Use When:**
- Line is far from current position
- Don't want permanent breakpoint
- Testing specific code path

### Step Over Next Function Call
Advanced stepping that steps over all function calls:

- Use Step over when line contains function calls
- Step into only when you want to debug that specific function
- Combine techniques to navigate efficiently

---

## Inspecting Variables

### Scope Pane
Shows variables available in current scope:

**Local Scope:**
- Function arguments
- Local variables
- Variables declared in function

**Closure Scope:**
- Variables from enclosing functions
- Shows function scope chain

**Global Scope:**
- Global (window) variables
- All globally accessible variables

**Inspecting Values:**
- Hover over variable to see value
- Click variable to expand object properties
- Some objects are only available while paused

### Watch Expressions
Monitor values of custom expressions:

**Add Watch Expression:**
1. Right panel → Watch section
2. Click "+" button
3. Type JavaScript expression
4. Press Enter

**Examples:**
```javascript
user.name               // Property value
items.length           // Array length
typeof data            // Type check
user.id === 42         // Boolean expression
Math.sqrt(value)       // Computed value
```

**Behavior:**
- Expressions evaluated in current scope
- Only works while paused
- Updates when you step
- Remove by right-clicking

### Inspect Object Properties

**Expand Objects:**
1. Hover over variable to see preview
2. Click arrow to expand object
3. See all properties and values

**Property Details:**
- **Property name**: Left side
- **Value**: Right side (may be truncated)
- **Getters**: Click arrow to invoke getter

**Copy Values:**
- Right-click property → Copy value
- Useful for large values

### Inline Values Display
When paused, gray text shows variable values inline:

```javascript
let count = 5;         // ← shows: 5
let name = 'Alice';    // ← shows: 'Alice'
let obj = {x: 1};      // ← shows: {x: 1}
```

Hover over inline values to see more details.

---

## Call Stack and Frames

### Understanding the Call Stack
Shows the function call chain that led to current location:

**Example:**
```javascript
function first() {
  second();
}

function second() {
  third();
}

function third() {
  debugger;  // Paused here
}

first();  // Initial call
```

**Call Stack (top to bottom):**
1. `third()` - Current location (top)
2. `second()` - Called third()
3. `first()` - Called second()
4. Anonymous - Called first()
5. (global)

### Inspecting Frames

**Click Frame in Call Stack:**
1. Call Stack section (right panel)
2. Click function name to jump to that frame
3. Code editor shows that function's source
4. Scope pane shows variables at that frame

**Frame Information:**
- Function name
- File and line number
- Local scope for that frame
- Arguments passed to function

### Restart Frame (Advanced Debugging)

Re-execute a function from the beginning:

**How:**
1. Pause execution (set breakpoint and trigger)
2. Call Stack pane, right-click frame
3. Select **Restart frame**
4. Function re-executes from first line
5. Can step through again

**Use Cases:**
```javascript
function calculate(value) {
  console.log(value);      // Paused here
  value++;
  console.log(value);
}

calculate(10);
```

Without restart: Would execute 10, increment, then 11.

With restart:
1. Paused at console.log(10)
2. Restart frame
3. Now paused at first line again
4. Can step through with different values

**Powerful Debugging:**
- Test different code paths
- Modify values and re-run function
- Avoid restarting entire application

**Limitations:**
- Can't modify function definition
- Doesn't reset external state
- Some operations can't be undone

---

## Exception Handling

### Understanding Exceptions

**Uncaught Exceptions:**
Not caught by `try-catch`, propagates up.

```javascript
function risky() {
  throw new Error('Something failed!');  // Not caught
}

risky();  // Pauses here if "pause on uncaught" enabled
```

**Caught Exceptions:**
Handled by `try-catch`.

```javascript
try {
  throw new Error('Something failed!');
} catch (e) {
  console.log('Handled:', e.message);  // This runs
}
```

### Pause on Uncaught Exceptions
Breaks on errors not handled:

**Enable:**
1. Breakpoints section
2. Check "Pause on uncaught exceptions"

**Useful for:**
- Finding critical errors
- Errors that break functionality
- Unhandled rejections

### Pause on Caught Exceptions
Breaks on all exceptions, even if caught:

**Enable:**
1. Breakpoints section
2. Check "Pause on caught exceptions"

**Useful for:**
- Finding silent failures
- Debugging exception handling code
- Understanding error flow

### Exception Info
When paused on exception:

**Exception Object Available:**
- Click exception to expand
- See error message
- See stack trace
- See error type

**Console While Paused:**
- Type variable names to inspect
- Example: `e.message` shows error message
- Can modify variables and continue

---

## Advanced Techniques

### Modify Variables During Debugging

While paused, change variable values:

**In Scope Pane:**
1. Find variable in Scope section
2. Double-click the value
3. Type new value
4. Press Enter

**In Console:**
1. Paused at breakpoint
2. Type: `variableName = newValue`
3. Press Enter
4. Variable changed
5. Step through with new value

**Use Cases:**
- Test different code paths
- Fix wrong values to continue testing
- Simulate different states

### Conditional Breakpoint with Complex Logic

Breakpoint conditions can be complex:

```javascript
// Set conditional breakpoint with expression:
index > 5 && user.status === 'active' && Math.random() > 0.5
```

Pauses only when ALL conditions true.

### Combine Breakpoint Types

Use multiple breakpoint types together:

1. **Line breakpoint** to pause at specific location
2. **Watch expression** to monitor specific value
3. **Conditional breakpoint** to trigger on specific condition
4. **Event breakpoint** to catch user interaction

### Debugging Async Code

Breakpoints work with async functions:

```javascript
async function fetchData() {
  const response = await fetch('/api/data');  // Can set breakpoint here
  const data = await response.json();         // And here
  return data;
}
```

**Call Stack Shows:**
- Async stack trace showing original caller
- Easier to understand async flow

### Debugging Promises

Break on promise rejections:

```javascript
fetch('/api/data')
  .then(response => response.json())  // Breakpoint here
  .catch(error => {
    console.error(error);              // Or here
  });
```

If `catch` has breakpoint with "pause on caught exceptions", pauses here.

---

## Code Organization

### Overrides (Override Files Locally)
Edit and persist file changes. See [07-overrides.md](07-overrides.md).

### Snippets
Create reusable code snippets:

**Create Snippet:**
1. Sources panel → Snippets (left sidebar)
2. Right-click → New snippet
3. Write code
4. Press `Ctrl+Enter` to run

**Use Cases:**
- Utility functions
- Debugging scripts
- Testing code
- Quick prototypes

**Running Snippets:**
- `Ctrl+Enter` in snippet
- Right-click → Run
- From Console: `snippet` command

### Changes Tab
View modifications to files:

**What It Shows:**
- Like `git diff` for DevTools
- Before/after comparison
- Line-by-line changes

**Accessing:**
1. Sources panel → Changes tab
2. Shows all unsaved modifications
3. Click file to see diff

---

## Tips and Tricks

### Keyboard Shortcuts

| Action | Keys |
|--------|------|
| Step over | F10 |
| Step into | F11 |
| Step out | Shift+F11 |
| Resume | F8 |
| Toggle breakpoint | Ctrl+B |
| Jump to line | Ctrl+G |
| Search file | Ctrl+F |
| Find in all files | Ctrl+Shift+F |

### Efficient Debugging Workflow

1. **Identify bug location** → Add breakpoint
2. **Trigger the code** → Interaction that causes bug
3. **Inspect state** → Scope pane, watch expressions
4. **Step through** → Narrow down issue
5. **Test fix** → Modify variable or file
6. **Verify** → Step through fixed code
7. **Remove breakpoint** → When done

### Common Debugging Patterns

**Find Where Variable Changes:**
```javascript
// Set conditional breakpoint:
variable === unexpectedValue
```

**Debug Loop Iteration:**
```javascript
// Set conditional breakpoint:
index === 42  // Break on specific iteration
```

**Track Function Calls:**
```javascript
// In console:
debug(functionName);
// Or use logpoint to log each call
```

**Test Code Quickly:**
```javascript
// Edit source, then:
// 1. Logpoint to add temporary logging
// 2. Continue execution (F8)
// 3. See results in console
```

### Performance Debugging
While stepping, be aware:
- Stepping is slow (line-by-line)
- For performance issues, use Lighthouse and Coverage
- Use logpoints instead of breakpoints for high-frequency code

### Debugging Race Conditions
- Multiple breakpoints can help isolate timing issues
- Use breakpoints on different async paths
- Watch expressions to see state changes

---

## Summary

The Sources panel is essential for:
- **Setting breakpoints** to pause execution
- **Stepping** through code to understand flow
- **Inspecting** variables and state
- **Understanding** call stack
- **Debugging** complex application logic
- **Testing** fixes without restarting

Master the Sources panel to solve bugs efficiently and understand your code deeply.

---

## Related Docs
- [Console Panel - Debugging Utilities](02-console.md)
- [Elements Panel - DOM Breakpoints](01-elements.md)
- [Overrides - Local Testing](07-overrides.md)
