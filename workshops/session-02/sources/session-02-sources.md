# Sources Panel: JavaScript Debugging

The Sources panel is the main place to debug JavaScript in Chrome DevTools. It helps you pause code, step through logic, inspect runtime state, and understand why a page behaves the way it does.

---

## Table of Contents

1. [Session Goal](#session-goal)
2. [Demo File](#demo-file)
3. [Sources Panel Layout](#sources-panel-layout)
4. [Line Breakpoints](#line-breakpoints)
5. [Conditional Breakpoints](#conditional-breakpoints)
6. [Logpoints](#logpoints)
7. [Stepping Through Code](#stepping-through-code)
8. [Scope and Variables](#scope-and-variables)
9. [Watch Expressions](#watch-expressions)
10. [Call Stack](#call-stack)
11. [Pause on Exceptions](#pause-on-exceptions)
12. [DOM Breakpoints](#dom-breakpoints)
13. [Event Listener Breakpoints](#event-listener-breakpoints)
14. [XHR and Fetch Breakpoints](#xhr-and-fetch-breakpoints)
15. [Debugger Statement](#debugger-statement)
16. [Bug Investigation](#bug-investigation)
17. [Snippets](#snippets)
18. [Guided Practice](#guided-practice)
19. [Debugging Checklist](#debugging-checklist)

**Demo file:**

```text
Chrome-DevTools-Reference/workshops/session-02/sources/debugging-workshop.html
```

---

## Session Goal

By the end of this session, participants should be able to:

- Open JavaScript source files in the Sources panel.
- Pause execution with line breakpoints.
- Use conditional breakpoints to pause only when a specific condition is true.
- Use logpoints to add temporary logging without editing code.
- Step over, step into, step out, and resume execution.
- Inspect local variables, closure variables, and global values.
- Add watch expressions for values they care about.
- Read the call stack and move between stack frames.
- Pause on caught or uncaught exceptions.
- Set DOM breakpoints for subtree, attribute, and node-removal changes.
- Use event listener and XHR/fetch breakpoints to locate code paths.
- Use the `debugger;` statement to hardcode a pause.
- Investigate a deliberate rendering bug end-to-end.
- Create and run Sources snippets.

---

## Demo File

A single merged file covers all topics in sequence:

```text
Chrome-DevTools-Reference/workshops/session-02/sources/debugging-workshop.html
Chrome-DevTools-Reference/workshops/session-02/sources/debugging-workshop.js
```

Recommended setup:

1. Open `debugging-workshop.html` in Chrome.
2. Open DevTools (`F12`).
3. Go to the **Sources** panel.
4. In the file navigator, open `debugging-workshop.js`.
5. Keep the page visible so you can click demo buttons while DevTools is open.

### Section Map

| # | Section | Key Technique |
|---|---|---|
| 1 | Step Through Code | Step Over, Step Into, Step Out |
| 2 | Conditional Breakpoint | Pause only when `order.status === 'failed'` |
| 3 | Logpoints | Log without pausing |
| 4 | Watch Expressions | Monitor `subtotal`, `discount`, `finalTotal` |
| 5 | Call Stack Analysis | Trace `formatInvoiceNumber` → `buildInvoice` → `createInvoice` |
| 6 | Pause on Exceptions | 6.1 Caught (form validation) · 6.2 Uncaught (bare throw) |
| 7 | DOM Breakpoints | Subtree · attribute · node-removal · global removal intercept |
| 8 | Event Listener Breakpoints | keydown · click · dblclick · mouseup · mouseover · mouseenter · wheel |
| 9 | XHR / Fetch Breakpoints | Pause before `todos` fetch |
| 10 | Debugger Statement | Hardcoded pause with `debugger;` |
| 11 | Bug Investigation | `task.done` vs `task.completed` mismatch |
| 12 | Snippet Practice | `window.debugLabState` via Sources snippet |

---

## Sources Panel Layout

The Sources panel has three main areas.

| Area | What It Does |
|---|---|
| File navigator | Lists files loaded by the page. |
| Code editor | Shows source code and line numbers. |
| Debug sidebar | Shows breakpoints, scope, watch expressions, call stack, and event breakpoints. |

### Useful Navigation

| Action | Windows/Linux | macOS |
|---|---|---|
| Search current file | `Ctrl+F` | `Cmd+F` |
| Find in all files | `Ctrl+Shift+F` | `Cmd+Option+F` |
| Jump to line | `Ctrl+G` | `Ctrl+G` |
| Command Menu | `Ctrl+Shift+P` | `Cmd+Shift+P` |

---

## Line Breakpoints

A line breakpoint pauses JavaScript when execution reaches a selected line.

### Set a Line Breakpoint

1. Open `debugging-workshop.js` in the Sources panel.
2. Find `stepThroughDemo()`.
3. Click the line number beside `const priceWithTax = applyTax(basePrice, 0.18);`.
4. Click **Run Step Demo** on the page.
5. Execution pauses before that line runs.

### What to Inspect While Paused

- The highlighted line in the editor.
- The **Scope** pane for local variables.
- The **Call Stack** pane for the active function.
- The Console — it can evaluate variables while paused.

### Remove or Disable

- Click the blue breakpoint marker to remove it.
- Right-click to disable, edit, or delete.

---

## Conditional Breakpoints

A conditional breakpoint pauses only when an expression evaluates to true.

### Demo

1. Find `processOrders()` in `debugging-workshop.js`.
2. Right-click the line number for `const message = buildOrderMessage(order);`.
3. Choose **Add conditional breakpoint**.
4. Enter:

```javascript
order.status === 'failed'
```

5. Click **Process Orders**.

Execution pauses only for failed orders, skipping paid ones.

### Useful Conditions

```javascript
order.status === 'failed'
subtotal > 500
i === 5
typeof value !== 'number'
```

---

## Logpoints

A logpoint writes a message to the Console without pausing execution and without changing the source file.

### Add a Logpoint

1. Right-click the `const message = buildOrderMessage(order);` line.
2. Choose **Add logpoint**.
3. Enter:

```javascript
Order ${order.id}: ${order.status}
```

4. Click **Process Orders**.

The Console logs each order without stopping execution.

### When to Use

- You need temporary logging without editing files.
- A normal breakpoint would pause too many times.
- You want to observe values while the page continues running.

---

## Stepping Through Code

When execution is paused, use the debug controls to move through code.

| Action | Shortcut | Meaning |
|---|---|---|
| Resume | `F8` | Continue until the next breakpoint or exception. |
| Step over | `F10` | Run the current line without entering called functions. |
| Step into | `F11` | Enter the function called on the current line. |
| Step out | `Shift+F11` | Finish the current function and return to the caller. |

### Practice

1. Set a breakpoint in `stepThroughDemo()`.
2. Click **Run Step Demo**.
3. Use `F10` to step over `applyTax()` without entering it.
4. Use `F11` on the `formatPrice()` line to step into it.
5. Use `Shift+F11` to step back out to `stepThroughDemo()`.
6. Use `F8` to resume.

`stepThroughDemo()` calls `applyTax()` and `formatPrice()` — real function calls that make Step Into and Step Out meaningful.

---

## Scope and Variables

The **Scope** pane shows values available at the paused line.

| Section | Contents |
|---|---|
| Local | Variables inside the current function. |
| Closure | Variables captured from outer functions. |
| Global | Values available on `window`. |

### Practice

1. Set a breakpoint inside `calculateCartTotal()`.
2. Click **Calculate Cart**.
3. Expand the **Local** scope and inspect `subtotal`, `discount`, `finalTotal`, `couponCode`.
4. Hover over variables in the code editor to see their values.

### Console While Paused

```javascript
subtotal
couponCode === 'SESSION2'
Object.keys(cartItems[0])
```

---

## Watch Expressions

Watch expressions keep important values visible while stepping.

### Add Watch Expressions

1. Pause inside `calculateCartTotal()`.
2. Open the **Watch** section in the debug sidebar.
3. Click **+** and add:

```javascript
subtotal
discount
finalTotal
couponCode === 'SESSION2'
```

4. Step through the function and watch values update.

---

## Call Stack

The call stack shows how execution reached the current line.

### Demo

1. Set a breakpoint inside `formatInvoiceNumber()`.
2. Click **Create Invoice**.
3. Inspect the **Call Stack** pane.

Expected chain:

```text
formatInvoiceNumber
buildInvoice
createInvoice
```

### Inspect Stack Frames

Click different frames in the Call Stack pane. DevTools updates the visible source location and the Scope values for that frame.

---

## Pause on Exceptions

### 6.1 Caught Exceptions

A caught exception is handled by a `try...catch` block. DevTools normally lets it pass silently, but with the setting enabled it pauses at the exact `throw` line.

1. In the **Breakpoints** section, enable **Pause on caught exceptions**.
2. Leave Name or Role empty on the form.
3. Click **Save Profile**.
4. DevTools pauses at the `throw` line inside `validateProfile()`.
5. Inspect `error.message` and the call stack.
6. Resume — the `catch` block handles the error and shows it in the output.

### 6.2 Uncaught Exceptions

An uncaught exception has no `try...catch`. If DevTools is not watching, it crashes the running script silently.

1. Enable **Pause on uncaught exceptions**.
2. Click **Throw Uncaught Exception**.
3. DevTools pauses directly at the `throw new Error(...)` line inside `testUncaughtException()`.
4. Inspect the Scope, the error message, and the call stack.
5. Resume — the error also appears in the Console as an unhandled rejection.

### Difference at a Glance

| | Caught | Uncaught |
|---|---|---|
| Wrapped in `try...catch`? | Yes | No |
| Setting needed | Pause on **caught** exceptions | Pause on **uncaught** exceptions |
| Page crashes after resume? | No — `catch` handles it | Yes — script execution stops |
| Typical use | Silent failures in error-handling code | Unexpected crashes |

---

## DOM Breakpoints

### 7.1 Subtree Modifications

1. In the Elements panel, find `<div id="mutation-target">`.
2. Right-click → Break on → Subtree modifications.
3. Click **Modify DOM**. DevTools pauses when the child content changes.

### 7.2 Attribute Changes

1. Find `<div id="attribute-target">`.
2. Right-click → Break on → Attribute modifications.
3. Click **Change Class**. DevTools pauses when `class` is toggled.

### 7.3 Node Removal (Element Panel)

1. Find `<div id="removal-container">`.
2. Right-click → Break on → Node removal.
3. Click **Remove Element**. DevTools pauses just before the node is removed.

Limitation: this only works if you can find and right-click the element **before** it disappears. If the element is removed during page load, inside a third-party script, or before the panel is open, the breakpoint cannot be set in time.

### 7.4 Global DOM Removal Intercept

When a node disappears before you can right-click it — during page load, in a framework teardown, or from a third-party script — the Elements panel breakpoint is useless because the element is already gone.

The solution is to patch `Element.prototype.remove` so that **every removal in the entire page triggers a pause**, regardless of which code caused it.

**Demo flow:**

1. Click **Enable Global Removal Intercept** — this patches `Element.prototype.remove` live in the page.
2. Click **Remove an Element** — DevTools pauses inside the patched `remove()` with a full call stack showing exactly what triggered the removal.
3. Resume, then click **Reset Element** to restore the target for another round.
4. Click **Disable Global Removal Intercept** to restore the original `Element.prototype.remove`.

**What the patch does:**

```javascript
const _origRemove = Element.prototype.remove;
Element.prototype.remove = function () {
    console.trace('remove() called on', this);
    debugger;  // pauses here for every .remove() call
    return _origRemove.call(this);
};
```

**Note:** This same code can be pasted directly into the Console or saved as a Sources Snippet to use on any page — not just this demo. It is especially useful when a third-party library or a framework (React, Vue, Angular) removes an element during its own lifecycle and you have no idea where in the code it happens.

To target only one specific element instead of all elements:

```javascript
const el = document.querySelector('.target');
const _o = el.remove.bind(el);
el.remove = function () { debugger; _o(); };
```

Alternative using Chrome's built-in Console helper (no code needed):

```javascript
debug(Element.prototype.remove);   // enable
undebug(Element.prototype.remove); // disable
```

| Approach | Scope | Requires finding element first? |
|---|---|---|
| Break on → Node removal | Single known element | Yes — must right-click in Elements panel |
| Prototype patch / `debug()` | All elements globally | No |
| Per-element override | One element by selector | Yes — but only JS access needed, not panel |

---

## Event Listener Breakpoints

All event listener breakpoints are set in: Sources sidebar → **Event Listener Breakpoints** → expand the group → check the event name.

### 8.1 Keyboard — keydown

1. Expand **Keyboard** and check **keydown**.
2. Type in the search input. DevTools pauses inside `handleSearchKeydown`.
3. Inspect `event.key` and `event.target.value` in Scope.

### 8.2 Mouse — click / dblclick / mouseup

| Event | How to trigger |
|---|---|
| `click` | Single click on the blue box |
| `dblclick` | Double-click on the blue box |
| `mouseup` | Press and release mouse button on the blue box |

1. Expand **Mouse** and check **click**, **dblclick**, or **mouseup** individually.
2. Interact with the blue box. DevTools pauses inside the matching named handler.
3. For `mouseup`, inspect `event.button` — `0` = left, `1` = middle, `2` = right.

**Note:** `click` fires after `mouseup`. If both are enabled, DevTools pauses twice per click.

### 8.3 Mouse — mouseover / mouseenter

1. Enable **mouseover** or **mouseenter** under **Mouse**.
2. Move the cursor onto the yellow hover box.

**Difference:**

| Event | Fires on child elements? | Bubbles? |
|---|---|---|
| `mouseover` | Yes — fires again when entering each child | Yes |
| `mouseenter` | No — fires only once when entering the element boundary | No |

### 8.4 Mouse — wheel

1. Enable **wheel** under **Mouse**.
2. Scroll inside the green scrollable box.
3. Inspect `event.deltaY` (vertical) and `event.deltaX` (horizontal) in Scope.

---

## XHR and Fetch Breakpoints

XHR/fetch breakpoints pause before a matching network request is sent.

### Add an XHR/Fetch Breakpoint

1. In the debug sidebar, expand **XHR/fetch Breakpoints**.
2. Click **+** and enter:

```text
todos
```

3. Click **Load Remote Todo**.
4. DevTools pauses before `fetch('https://jsonplaceholder.typicode.com/todos/1')` runs.
5. Inspect local variables and the call stack.
6. Resume to see the response.

---

## Debugger Statement

The `debugger;` statement pauses execution at that exact line without any manually set breakpoint.

### Demo

Click **Run Debugger Statement**. Execution pauses at:

```javascript
debugger;  // inside debuggerDemo()
```

Inspect `value` in the Scope pane, then resume.

### When to Use

- Quick temporary pause during local development.
- Useful inside async callbacks or event handlers where finding the line in the Sources panel is slow.
- Always remove before committing.

---

## Bug Investigation

### The Bug

Task cards display the correct label (`Done` / `Open`) but the green "done" card styling does not appear for completed tasks.

### Investigation Steps

1. Click **Render Tasks**.
2. Set a breakpoint inside `renderTasks()` on the `if (task.completed)` line.
3. Inspect `task` — it has a `done` property but not `completed`.
4. Click **Toggle Task 102** and step through `toggleTask()` back into `renderTasks()`.

### Root Cause

```text
The card label uses task.done, but the CSS class check uses task.completed.
Fix: change  if (task.completed)  →  if (task.done)
```

---

## Snippets

Snippets are reusable scripts stored and run from the Sources panel.

### Available Snippets

Pre-written snippets are in:

```text
Chrome-DevTools-Reference/workshops/session-02/sources/snippets/
```

| File | Purpose |
|---|---|
| `collect-image-urls.js` | Collects all image URLs from the page, copies them to clipboard, and prints a `wget` command for bulk download in a Linux terminal. |
| `inspect-debug-state.js` | Reads `window.debugLabState` and prints a formatted table of tasks and orders with a completed-task count. |
| `list-event-listeners.js` | Lists all interactive elements and their inline handlers as a quick audit before hunting for an unknown event path. |

### How to Add a Snippet in Chrome

1. Open **Sources** panel.
2. In the left sidebar, select **Snippets**.
3. Click **New snippet**.
4. Paste the content of the snippet file.
5. Press `Ctrl+Enter` to run, or right-click → **Run**.

### collect-image-urls — wget Workflow

This snippet is designed to prepare raw data for a `wget` download command:

1. Run the snippet on any page with images.
2. The Console prints each image URL and a ready-to-paste `wget` command:

```bash
wget -P ./images \
  https://example.com/photo1.jpg \
  https://example.com/photo2.png
```

3. Paste the command into a Linux terminal to download all images into `./images/`.

### inspect-debug-state — Snippet Practice

1. Open `debugging-workshop.html`.
2. Click **Expose Debug State** (section 12).
3. Run `inspect-debug-state.js`.
4. Toggle tasks and run the snippet again to observe the change.

---

## Guided Practice

### Exercise 1: Pause and Step

1. Set a breakpoint in `stepThroughDemo()`.
2. Click **Run Step Demo**.
3. Use `F11` to step into `applyTax()`. Confirm the `tax` value.
4. Use `Shift+F11` to step back out.
5. Use `F11` to step into `formatPrice()`.
6. Use `F8` to resume.

### Exercise 2: Conditional Breakpoint

1. Set a conditional breakpoint in `processOrders()`.
2. Use: `order.status === 'failed'`
3. Click **Process Orders**.
4. Confirm DevTools pauses only on the two failed orders.

### Exercise 3: Logpoint

1. Replace the conditional breakpoint with a logpoint on the same line.
2. Use: `Order ${order.id}: ${order.status}`
3. Click **Process Orders** and check the Console.

### Exercise 4: Watch Expressions

1. Set a breakpoint inside `calculateCartTotal()`.
2. Add watch expressions: `subtotal`, `discount`, `finalTotal`.
3. Step into `getDiscount()` and step out.
4. Confirm the final values.

### Exercise 5: Call Stack

1. Set a breakpoint inside `formatInvoiceNumber()`.
2. Click **Create Invoice**.
3. Click each call stack frame and explain the call chain.

### Exercise 6: Caught and Uncaught Exceptions

1. Enable **Pause on caught exceptions**. Leave Name empty, click **Save Profile**. Confirm pause at `throw`. Inspect `error.message`. Resume.
2. Enable **Pause on uncaught exceptions**. Click **Throw Uncaught Exception**. Confirm pause at the bare `throw` line. Note the difference in the Console after resuming.

### Exercise 7: Event Listener Breakpoints

1. Enable `Keyboard → keydown`. Type in the search box. Inspect `event.key`.
2. Enable `Mouse → click`. Click the blue box. Resume.
3. Enable `Mouse → dblclick`. Double-click the blue box. Compare the call stack with the `click` pause.
4. Enable `Mouse → mouseover` then `mouseenter` separately. Hover over the yellow box and explain the firing difference.
5. Enable `Mouse → wheel`. Scroll inside the green box. Inspect `event.deltaY`.

### Exercise 8: XHR/Fetch Breakpoint

1. Add an XHR/fetch breakpoint for `todos`.
2. Click **Load Remote Todo**.
3. Confirm the pause before the request fires. Resume and inspect the output.

### Exercise 9: Find the Rendering Bug

1. Set a breakpoint inside `renderTasks()`.
2. Click **Render Tasks**.
3. Inspect `task.done` vs `task.completed`.
4. Identify the mismatch and explain the fix.

### Exercise 10: Run a Snippet

1. Click **Expose Debug State**.
2. Add `inspect-debug-state.js` as a Sources snippet and run it.
3. Toggle a task and run the snippet again.
4. Add `collect-image-urls.js` and run it on any image-rich page.

---

## Debugging Checklist

1. Reproduce the issue.
2. Find the likely function or event.
3. Set a breakpoint near the suspicious line.
4. Trigger the issue again.
5. Inspect Scope and Watch values.
6. Step line by line until the value changes incorrectly.
7. Read the Call Stack to understand how execution arrived there.
8. Use a conditional breakpoint if the code runs many times.
9. Use a logpoint if pausing interrupts the workflow.
10. Remove or disable breakpoints after the investigation.

---

## Recap Questions

1. When would you use a conditional breakpoint instead of a normal breakpoint?
2. What is the difference between Step Over and Step Into?
3. Where do you inspect local variables while paused?
4. What does the Call Stack tell you?
5. When is a logpoint better than editing `console.log()` into the file?
6. How can you pause on a click handler when you do not know the function name?
7. What is the value of a Sources snippet compared with a one-time Console command?
8. How can the `collect-image-urls` snippet help you prepare a `wget` download command?

---

## Summary

The Sources panel helps you move from guessing to observing. Breakpoints stop the code at the right moment, stepping shows the execution path, Scope and Watch reveal current state, and the Call Stack explains how the code got there.

Use this session as the debugging foundation before moving into Network request analysis in Session 3.

---

## Related Docs

- [Session 1 Console notes](../../session-01/console/session-01-console.md)
- [Session 1 Elements notes](../../session-01/elements/session-01-elements.md)
- Source reference: `Chrome-DevTools-Reference/docs/03-sources.md`
