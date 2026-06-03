# Coverage Panel: Analyzing Code Usage and Optimization

The Coverage panel identifies unused CSS and JavaScript in your application. It helps you understand code efficiency and find opportunities to reduce bundle size.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [How Coverage Works](#how-coverage-works)
3. [Running Coverage Analysis](#running-coverage-analysis)
4. [Interpreting Results](#interpreting-results)
5. [Optimization Strategies](#optimization-strategies)
6. [Advanced Techniques](#advanced-techniques)

---

## Getting Started

### Opening the Coverage Panel
1. Press `Ctrl+Shift+I` (open DevTools)
2. Click three dots (⋮) → More tools
3. Select **Coverage**
4. Coverage panel opens at bottom

### What Coverage Shows
- **Files**: All CSS and JavaScript loaded
- **Percentage**: How much of file is used
- **Bytes**: Size of used vs. unused code
- **Status**: Used/Unused breakdown

---

## How Coverage Works

### Coverage Fundamentals

When DevTools analyzes coverage, it:
1. Records which code executes
2. Compares executed vs. loaded code
3. Calculates percentage used
4. Identifies unused lines

**Important:**
- Coverage is **usage-based**
- Only measures executed code
- Doesn't execute all code paths by default
- User interaction affects coverage

### Used vs. Unused

**Used Code:**
- Executed during recording period
- Highlighted in green
- Contributing to functionality

**Unused Code:**
- Loaded but never executed
- Highlighted in red
- Potential optimization target

---

## Running Coverage Analysis

### Start Recording

**Method 1: Recording Button**
1. Click record button (circle) at top-left
2. Changes to red recording icon
3. Interact with page
4. Coverage updates as code runs
5. Click stop to finish

**Method 2: Reload Page**
1. Click reload button
2. Automatically starts coverage recording
3. Page loads and executes normally
4. Coverage recorded from page start
5. Stops when loading complete

### Recording Duration

**Short Recording (1-2 seconds):**
- Only captures code that runs immediately
- Page initialization
- Initial render

**Extended Recording (user interaction):**
- More comprehensive coverage
- Click buttons, interact, navigate
- Captures more code paths
- Better optimization insights

### Best Practices

1. **Start with page load** → Records initialization
2. **Interact with page** → Execute all features
3. **Navigate to different sections** → Hit all code
4. **Stop recording** → When done testing
5. **Analyze results** → Identify unused code

---

## Interpreting Results

### Coverage Table

Each row represents one file:

| Column | Meaning |
|--------|---------|
| URL | File path/name |
| Type | CSS or JavaScript |
| Total Bytes | Total file size |
| Unused Bytes | Size of unused code |
| Usage Visualization | Color-coded bar |

**Percentage Calculation:**
```
Percentage Used = (Total - Unused) / Total × 100
```

Example:
```
File: app.js
Total: 100 KB
Unused: 30 KB
Used: 70 KB
Percentage: 70%
```

### Sorting Results

Click column headers to sort:
- **URL**: Alphabetical
- **Type**: CSS/JavaScript
- **Total Bytes**: File size (small to large)
- **Unused Bytes**: Unused amount (good for finding optimization targets)

### Clicking Individual Files

Click filename to see:
- Source code highlighted
- **Red**: Unused lines
- **Green**: Used lines
- Line numbers for unused code sections

**Example:**
```javascript
function importantFeature() {  // Green - used
  // ... code runs
}

function unusedFeature() {     // Red - never called
  // ... code never executes
}

importantFeature();            // Green - called
```

### Summary Metrics

Top of Coverage panel shows:
- **Total files analyzed**
- **Total bytes loaded**
- **Total bytes used**
- **Overall percentage used**

---

## Optimization Strategies

### Identify Unused Code

1. Sort by "Unused Bytes" (descending)
2. Focus on largest unused sections
3. Check if code is:
   - Dead code (safe to remove)
   - For unimplemented features
   - Browser/device specific
   - Performance critical

### Categories of Unused Code

**Dead Code:**
- Never called
- Can be safely removed
- Reduces bundle size

**Feature Flags:**
- Code for features not enabled
- Can be tree-shaken during build
- Conditional code that doesn't run

**Polyfills:**
- Compatibility code for old browsers
- Not needed for target browsers
- Can be removed from bundle

**Dependencies:**
- Large libraries partially used
- Consider alternatives or smaller libraries
- Analyze usage before removal

### Bundle Size Optimization

**Quick Wins:**
1. Remove dead code (red sections)
2. Minify remaining code
3. Enable gzip compression
4. Code splitting for large apps

**Before and After:**
```
Before optimization:
- app.js: 500 KB (50% used) = 250 KB actual usage
- vendor.js: 400 KB (30% used) = 120 KB actual usage
- styles.css: 100 KB (60% used) = 60 KB actual usage

Opportunity: 430 KB of unused code

After optimization:
- Remove dead code: 270 KB
- Code splitting: Split into chunks, load on demand
- Final size: 200 KB (4x smaller)
```

### Performance Impact

**Unused Code Cost:**
- Parse and compile time (impacts startup)
- Memory usage
- Network transfer time
- Cache misses

**Optimization Benefit:**
- Faster page load
- Better time-to-interactive
- Reduced bandwidth usage
- Better mobile performance

---

## Advanced Techniques

### Coverage During Development

**Continuous Analysis:**
1. Run coverage periodically
2. Watch for increasing unused code
3. Remove dead code regularly
4. Prevent bloat

**In Your Workflow:**
1. Write feature → Run coverage
2. Test all feature paths
3. Check coverage percentage
4. Commit optimized code

### Coverage vs. Tests

**Coverage ≠ Test Coverage**
- DevTools coverage: Which code executes
- Test coverage: Which code paths tested

**Using Together:**
1. Run DevTools coverage while using app
2. Check what user-facing code runs
3. Run tests to ensure correctness
4. Compare: User paths vs. test paths

### Browser-Specific Code

**Testing Different Browsers:**
1. Run coverage in Chrome
2. Run same test in Firefox (if applicable)
3. Compare results
4. Find browser-specific code
5. Optimize for each browser

### Feature-Based Coverage

**Before/After Feature:**
1. Run coverage without feature enabled
2. Note baseline
3. Enable feature
4. Run coverage again
5. See additional code used by feature

**Use Case:**
```
Feature cost: 50 KB
Frequency of use: 10% of users
Value calculation: Is feature worth 50 KB for 10% users?
```

### Coverage with Code Splitting

**Single Bundle:**
```
bundle.js: 1000 KB (40% used) = 600 KB unused
Problem: All users download unused code
```

**Code Splitting:**
```
core.js: 200 KB (90% used) = 20 KB unused
feature1.js: 300 KB (uses on demand)
feature2.js: 300 KB (uses on demand)
admin.js: 200 KB (admin only)

Benefit: Users only load needed code
```

### Automated Coverage Analysis

**Build Tool Integration:**
- Webpack provides coverage budgets
- ESLint can flag unused code
- Build tools can warn on size increases

**CI/CD Pipeline:**
```
1. Build application
2. Measure coverage
3. Compare to threshold
4. Fail build if too much unused code
5. Force developers to optimize
```

---

## Common Issues and Solutions

### High Unused Percentage

**Problem:** File shows 30% usage (70% unused)

**Investigation:**
1. Click file to see unused sections
2. Are unused sections:
   - Utilities not imported?
   - Dead code from refactoring?
   - Feature flags for disabled features?
3. Decide if safe to remove

**Solutions:**
- Tree-shake unused exports
- Remove dead code
- Feature-flag unused code
- Move to separate bundle

### Third-Party Library Bloat

**Problem:** Vendor library shows 50% unused

**Investigation:**
1. See which parts are used
2. Check if library is right fit
3. Consider alternatives

**Solutions:**
- Use smaller alternative
- Extract only needed functionality
- Lazy-load heavy dependencies
- Consider tree-shaking support

### CSS Not Included in Coverage

**Problem:** CSS files not showing in coverage

**Solution:**
- CSS coverage is enabled by default
- If not showing, check CSS loading
- Inline styles may not appear
- Dynamic CSS injection not tracked

---

## Summary

The Coverage panel is essential for:
- **Identifying** unused code
- **Optimizing** bundle size
- **Understanding** code paths
- **Measuring** code efficiency
- **Improving** performance

Master the Coverage panel to keep your application lean and fast.

---

## Related Docs
- [Network Panel - Performance Analysis](04-network.md)
- [Lighthouse Panel - Performance Metrics](06-lighthouse.md)
