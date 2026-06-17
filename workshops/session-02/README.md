# Session 02: Sources Panel and JavaScript Debugging

This session focuses on debugging JavaScript execution with the Chrome DevTools Sources panel.

- **Sources**: open loaded files, set breakpoints, step through code, inspect scope, watch expressions, review the call stack, and pause on exceptions or browser events.
- **Debugging workflow**: reproduce a problem, pause at the right line, inspect state, trace the caller, test assumptions, and continue.

Use the detailed notes and demo files inside the `sources` folder for hands-on practice.

## Open DevTools

| Method | Windows/Linux | macOS |
|---|---|---|
| Open DevTools | `F12` or `Ctrl+Shift+I` | `Cmd+Option+I` |
| Open Sources from DevTools | Click **Sources** | Click **Sources** |
| Command Menu | `Ctrl+Shift+P` | `Cmd+Shift+P` |
| Search current file | `Ctrl+F` | `Cmd+F` |
| Find in all files | `Ctrl+Shift+F` | `Cmd+Option+F` |

## Session Files

### Sources

Pause code execution, step through functions, inspect variables, add watch expressions, use conditional breakpoints and logpoints, examine the call stack, debug exceptions, pause on events or XHR/fetch calls, create snippets, and practice a small bug investigation.

- [Sources notes](sources/session-02-sources.md)
- [Breakpoint warm-up demo](sources/01-breakpoints.html)
- [JavaScript debugging lab](sources/02-debugging-lab.html)

## Topic Coverage

| Topic | Demo File | Practice Area |
|---|---|---|
| Sources layout and file navigation | `01-breakpoints.html`, `02-debugging-lab.html` | Open loaded source files and locate functions. |
| Line breakpoints and stepping | `01-breakpoints.html` | Pause, step over, step into, step out, and resume. |
| Conditional breakpoints | `01-breakpoints.html`, `02-debugging-lab.html` | Pause on one loop iteration or failed order. |
| Logpoints | `02-debugging-lab.html` | Log order state without editing source. |
| Scope and Watch expressions | `01-breakpoints.html`, `02-debugging-lab.html` | Inspect cart totals, user data, and computed values. |
| Call Stack | `01-breakpoints.html`, `02-debugging-lab.html` | Trace nested function calls. |
| Pause on exceptions | `01-breakpoints.html`, `02-debugging-lab.html` | Inspect caught validation errors. |
| Event listener breakpoints | `01-breakpoints.html`, `02-debugging-lab.html` | Pause on click and keyboard events. |
| XHR/fetch breakpoints | `02-debugging-lab.html` | Pause before a remote request is sent. |
| Snippets | `02-debugging-lab.html` | Run reusable debugging code against page state. |
| Bug-finding workflow | `02-debugging-lab.html` | Debug a deliberate task-rendering bug. |

## Suggested Time Split

- 5 minutes: Recap Session 1 and introduce the debugging workflow.
- 15 minutes: Explain Sources layout, breakpoint types, stepping, scope, and call stack.
- 10 minutes: Breakpoint warm-up using `sources/01-breakpoints.html`.
- 20 minutes: Full debugging lab using `sources/02-debugging-lab.html`.
- 10 minutes: Q&A, recap, and a bug-finding exercise.

## Quick Practice

1. Open `sources/01-breakpoints.html` in Chrome for the breakpoint warm-up.
2. Open DevTools with `F12` or `Ctrl+Shift+I`.
3. Go to the **Sources** panel and open the page file from the file navigator.
4. Set a line breakpoint in `stepThroughDemo()`.
5. Click **Run Step Demo** on the page.
6. Use `F10`, `F11`, `Shift+F11`, and `F8` to move through the code.
7. Add a conditional breakpoint in the loop demo with `i === 5`.
8. Add a watch expression such as `userData.name` during the watch demo.
9. Trigger the call stack demo and inspect each stack frame.
10. Open `sources/02-debugging-lab.html`.
11. Practice logpoints, exception pausing, event listener breakpoints, XHR/fetch breakpoints, snippets, and the task-rendering bug exercise.

## References

- Official Chrome DevTools Sources panel overview: https://developer.chrome.com/docs/devtools/sources
- JavaScript debugging in Chrome DevTools: https://developer.chrome.com/docs/devtools/javascript
- Breakpoints reference: https://developer.chrome.com/docs/devtools/javascript/breakpoints
- Snippets: https://developer.chrome.com/docs/devtools/javascript/snippets
