# Elements Panel: DOM Inspection and Manipulation

The Elements panel allows you to inspect, edit, and debug the HTML and CSS of your web pages. It provides a real-time view of the DOM tree with the ability to modify elements, view computed styles, and understand the box model.

---

## Table of Contents

1. [Viewing the DOM](#viewing-the-dom)
2. [Searching the DOM](#searching-the-dom)
3. [Editing the DOM](#editing-the-dom)
4. [CSS Inspection and Editing](#css-inspection-and-editing)
5. [Element Measurements](#element-measurements)
6. [DOM Change Breakpoints](#dom-change-breakpoints)
7. [Event Listeners](#event-listeners)
8. [Accessibility Tree](#accessibility-tree)
9. [Advanced Techniques](#advanced-techniques)
10. [Tips and Tricks](#tips-and-tricks)

---

## Viewing the DOM

### The DOM Tree
The DOM Tree in the Elements panel shows the hierarchical structure of HTML elements on the page.

**Expanding Elements:**
- Click the arrow (`▶`) next to an element to expand/collapse its children
- Double-click an element to expand all descendants
- The DOM Tree updates in real-time as JavaScript modifies the page

**Highlighting Elements:**
- Hover over an element in the DOM Tree to highlight it on the page
- The overlay shows:
  - Element dimensions
  - Margin and padding
  - Content area
  - Box model visualization

**Selecting Elements:**
- Click an element in the DOM Tree to select it
- Use keyboard arrows to navigate the tree
- Press Enter to expand/collapse

### Bread Crumb Navigation
At the bottom of the Elements panel, a breadcrumb trail shows the element hierarchy:
```
html > body > div.container > section#main > article
```
Click any breadcrumb to select that element.

---

## Searching the DOM

### Method 1: Text Search
Press `Ctrl+F` (Windows/Linux) or `Cmd+F` (macOS) to open the search bar.

Search by:
- **Tag name**: `p` finds all paragraph elements
- **Class name**: `.button` finds elements with class "button"
- **ID**: `#header` finds element with ID "header"
- **Attribute**: `[href]` finds all elements with href attribute
- **Text content**: Type any text to find elements containing that text

**Search Results:**
- Results are highlighted in orange/yellow in the DOM Tree
- Navigation arrows allow you to cycle through results
- Counter shows current result / total results

### Method 2: XPath Selectors
Advanced DOM search using XPath expressions:

**Basic XPath Syntax:**

| Expression | Description | Example |
|------------|-------------|---------|
| `nodename` | Selects nodes with tag name | `//p` selects all paragraphs |
| `/` | Root node (absolute path) | `/html/body/div` |
| `//` | Any node matching (relative path) | `//div` selects all divs |
| `.` | Current node | `./..` selects parent |
| `..` | Parent node | `//span/..` selects span's parent |
| `@` | Attributes | `//@href` selects all href attributes |
| `*` | Any element | `//*` selects all elements |

**XPath Predicates (Filtering):**

Conditions within square brackets `[]` filter results:

```xpath
//input[@type='submit']        # Input with type='submit'
//h1[text()='Welcome']         # H1 with exact text "Welcome"
//ul/li[2]                     # Second li in ul (index starts at 1)
//div[@class='active'][1]      # First div with class 'active'
//p[position()>2]              # All paragraphs after the 2nd
//button[contains(text(), 'Click')] # Buttons containing "Click"
```

**Using XPath in DevTools:**
1. Press `Ctrl+F` in Elements panel
2. Type XPath expression starting with `//`
3. Results highlight in the DOM Tree

### Method 3: CSS Selectors
Standard CSS selectors also work in the search:

```css
div.container          # Class selector
#main                  # ID selector
input[type="text"]     # Attribute selector
article > h1           # Child combinator
section p              # Descendant combinator
```

---

## Editing the DOM

### In-Place HTML Editing

**Edit Element HTML:**
1. Right-click element → **Edit as HTML**
2. Modify the HTML directly
3. Press `Ctrl+Enter` or click elsewhere to apply
4. Changes are live on the page

**Edit Element Content:**
1. Double-click text content in Elements panel
2. Type new content
3. Press Enter to confirm

**Edit Attributes:**
1. Right-click attribute → **Edit Attribute**
2. Or double-click the attribute value
3. Modify and press Enter

### Hide Elements
Press `H` to hide the selected element.

The element gets `display: none` applied temporarily.

Press `H` again to show the element.

**Alternative:**
1. Right-click element → **Hide element**
2. Same effect as pressing `H`

### Add/Remove Elements

**Add New Element:**
1. Right-click element → **Edit as HTML**
2. Add new HTML before the closing tag
3. Press `Ctrl+Enter` to apply

**Delete Element:**
1. Right-click element → **Delete element**
2. Or select element and press Delete

**Duplicate Element:**
1. Right-click element → **Duplicate element**
2. Creates a copy right after the original

### Move Elements (Drag and Drop)
1. Click and drag an element in the DOM Tree
2. Drop it on another element to make it a child
3. Changes are live on the page

---

## CSS Inspection and Editing

### Viewing Styles
The **Styles** panel shows all CSS applied to the selected element:

**Inline Styles:**
```css
style="color: red; font-size: 14px;"
```

**Stylesheet Rules:**
Organized by:
- CSS file name and line number
- Specificity (higher specificity rules override lower)
- User agent styles (browser defaults at bottom)

**Overridden Styles:**
- Crossed-out rules were overridden
- Hover to see what overrode them

### Live CSS Editing

**Edit Property Values:**
1. Click any CSS property value
2. Type new value
3. Press Enter to apply
4. Changes are instant on the page

**Add New Property:**
1. Click in empty area of CSS rule
2. Type property name
3. Press Tab, type value
4. Press Enter

**Toggle Properties:**
- Click checkbox next to property to enable/disable it
- Useful for testing variations

**Edit Selectors:**
1. Right-click selector → **Edit Selector**
2. Modify the selector
3. Press Enter

### Computed Styles
The **Computed** tab shows final computed styles after all CSS rules are applied.

**What It Shows:**
- Every property that affects the element
- Which stylesheet/line it came from
- Inheritance status
- Device-specific values

**Filter Computed Styles:**
- Type in search box to filter properties
- Shows only matching properties

### Box Model Visualization
The bottom of the Styles panel shows the **Box Model**:

```
┌─────────────────────────────┐
│         margin              │
│  ┌──────────────────────┐   │
│  │      border          │   │
│  │  ┌────────────────┐  │   │
│  │  │    padding     │  │   │
│  │  │ ┌──────────┐   │  │   │
│  │  │ │ content  │   │  │   │
│  │  │ └──────────┘   │  │   │
│  │  └────────────────┘  │   │
│  └──────────────────────┘   │
└─────────────────────────────┘
```

**Interactive Box Model:**
- Hover over dimensions to highlight them on page
- Click dimensions to edit values
- Shows actual pixel values

---

## Element Measurements

### Show Rulers on Hover
Enable rulers to measure element dimensions while hovering.

**Enable Rulers:**
1. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS)
2. Type "Show rulers on hover"
3. Press Enter

Or via Settings:
1. Settings ⚙️ → **Preferences**
2. **Elements** section
3. Check "Show rulers on hover"

**Using Rulers:**
- Hover any element to see rulers
- Rulers show exact pixel dimensions
- Helps with precise layout measurements

### Capture Node Screenshot
Screenshot individual elements without affecting layout.

**Method 1: Right-click Element**
1. Right-click element in DOM Tree
2. Select **Capture node screenshot**
3. Screenshot saved to Downloads

**Method 2: Using Command Menu**
1. Press `Ctrl+Shift+P`
2. Type "Capture node screenshot"
3. Entire viewport screenshots (use this for full-page)

**Screenshot Variations:**
- Node screenshot: Single element with padding/margin
- Area screenshot: Selected rectangular area
- Full-page screenshot: Entire page (may be taller than viewport)
- Mobile device frame: Screenshot with device frame overlay

---

## DOM Change Breakpoints

Pause JavaScript execution when the DOM is modified.

### Setting DOM Breakpoints

**Subtree Modifications:**
1. Right-click element → **Break on** → **Subtree modifications**
2. Pauses when any descendant is added/removed/changed
3. Useful for finding code that modifies child elements

**Attribute Modifications:**
1. Right-click element → **Break on** → **Attribute modifications**
2. Pauses when any attribute changes
3. Useful for finding code that modifies properties

**Node Removal:**
1. Right-click element → **Break on** → **Node removal**
2. Pauses when element itself is removed
3. Useful for debugging cleanup code

### How It Works
1. Set the breakpoint (right-click → Break on)
2. Interact with page to trigger the DOM change
3. Execution pauses automatically
4. Examine call stack to find the JavaScript that made the change
5. Step through code to understand the modification

**Example:**
```javascript
// JavaScript
document.querySelector('.button').addEventListener('click', () => {
  document.body.innerHTML += '<div>New element</div>'; // Triggers subtree breakpoint
});
```

---

## Event Listeners

### View Event Listeners
The **Event Listeners** tab shows all JavaScript event handlers attached to elements.

**What You Can See:**
- Event type (click, change, submit, etc.)
- Handler function name
- File and line number
- Whether handler removes itself after firing

**For Each Listener:**
- Click function name to jump to source code
- Expand to see handler details
- See if event bubbles or is captured

### Managing Event Listeners

**Remove a Listener (Temporarily):**
1. Right-click listener → **Remove**
2. Handler no longer triggers
3. Useful for testing without modifying code

**Remove All Listeners (Type):**
1. Right-click any listener of same type
2. Select **Remove all ... listeners**

**View Event Object:**
1. Set a DOM breakpoint (see above)
2. When paused, Event object available in Console
3. Inspect event properties and methods

---

## Accessibility Tree

### View Accessibility Tree
DevTools includes tools for debugging accessibility issues.

**Enable Accessibility Inspector:**
1. Press `Ctrl+Shift+P`
2. Type "Accessibility Tree"
3. Opens Accessibility panel

**What It Shows:**
- Semantic HTML structure
- Accessible names and roles
- ARIA attributes
- Missing alt text
- Heading hierarchy
- Landmark elements (nav, main, footer)

**Common Issues:**
- Images without alt text
- Missing form labels
- Color contrast problems
- Heading level skips (h1 → h3)
- Missing landmarks

### Audit Accessibility
Use the **Lighthouse** panel for comprehensive accessibility audits:
1. Lighthouse panel → Generate report
2. Check "Accessibility" category
3. Detailed violations and fixes

---

## Advanced Techniques

### Copy Reference to Element

**Copy CSS Selector:**
1. Right-click element → **Copy** → **Copy selector**
2. Copies `.container > .item:nth-child(2)`
3. Paste in Console to reference element

**Copy XPath:**
1. Right-click element → **Copy** → **Copy XPath**
2. Copies `/html/body/div[1]/ul/li[2]`
3. Use in XPath search or automation

**Copy Full XPath:**
Similar to Copy XPath but includes full hierarchy from root.

**Copy JS Path:**
1. Right-click element → **Copy** → **Copy JS Path**
2. Copies `document.querySelector(".container")`
3. Can directly evaluate in Console

### Reference Selected Element in Console

**Using `$0` Variable:**
When you select an element in the Elements panel, it's automatically available as `$0` in the Console.

```javascript
// Element selected in Elements panel
$0                           // References the element
$0.classList                 // Get classes
$0.textContent              // Get text
$0.parentElement            // Get parent
$0.querySelectorAll('a')    // Find children
```

**Previous Selections:**
- `$0` = Currently selected element
- `$1` = Previously selected element
- `$2` = 2nd previous selection
- And so on... up to `$4`

**Store as Global Variable:**
1. Right-click element → **Store as global variable**
2. Creates variable like `temp1`
3. Usable in Console for testing

### Edit DOM Before Page Loads
Use **Overrides** feature to modify HTML before rendering:
1. Sources panel → Overrides
2. Select override folder
3. Modify HTML files
4. Changes persist across reloads

See [07-overrides.md](07-overrides.md) for details.

### DOM Breakpoints with Debugging
Combine DOM breakpoints with the debugger:

```javascript
// In DevTools Console
// Set a DOM breakpoint first, then:
$0.innerHTML = '<div>Test</div>';  // Triggers breakpoint
// Execution pauses, examine call stack
```

---

## Tips and Tricks

### Keyboard Shortcuts in Elements Panel

| Action | Keys |
|--------|------|
| Search DOM | `Ctrl+F` |
| Hide element | `H` |
| Expand element | `→` |
| Collapse element | `←` |
| Navigate down | `↓` |
| Navigate up | `↑` |
| Select parent | `←` while collapsed |
| Collapse all | `Ctrl+Alt+←` |
| Toggle styles | `Ctrl+Shift+P` → "Show" |

### Efficient Debugging Workflow

1. **Identify element** → Right-click on page → Inspect
2. **Search DOM** → `Ctrl+F` to find related elements
3. **Set breakpoint** → Right-click → Break on subtree modifications
4. **Trigger action** → Click button or interact with page
5. **Examine stack** → Look at call stack in Sources panel
6. **Jump to code** → Click file name in stack

### Performance Tips
- Large DOM trees are slow to inspect
- Collapse unnecessary elements while debugging
- Use search filters to focus on relevant elements
- Disable DevTools when not debugging (performance impact)

### Common Use Cases

**Finding Applied Styles:**
1. Select element
2. Styles panel shows all CSS
3. Scroll to bottom for user agent styles
4. Look for overridden rules (crossed-out)

**Debugging Layout Issues:**
1. Inspect element
2. Check Box Model visualization
3. Use rulers to measure dimensions
4. Check computed styles for conflicts

**Finding Event Handlers:**
1. Select element
2. Event Listeners tab
3. Expand listener to see function
4. Click function name to jump to source

**Testing CSS Changes:**
1. Select element
2. Edit CSS in Styles panel
3. See changes instantly
4. Copy final CSS back to source files

---

## Summary

The Elements panel is essential for:
- **Inspecting** DOM structure and CSS
- **Editing** elements and styles in real-time
- **Finding** elements by text, selector, or XPath
- **Debugging** DOM mutations and event listeners
- **Measuring** dimensions and spacing
- **Testing** layout changes before implementing

Master the Elements panel to dramatically speed up frontend debugging and development.

---

## Related Docs
- [Sources Panel - Debugging](03-sources.md)
- [Console Panel - DOM Utilities](02-console.md)
- [Overrides - Local Testing](07-overrides.md)
