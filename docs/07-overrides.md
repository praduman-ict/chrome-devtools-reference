# Overrides: Local Testing and Development Without Deployment

The Overrides feature allows you to modify local copies of files and persist changes across page reloads without deploying to a server. It's powerful for testing changes, developing locally, and debugging without affecting the production environment.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Setting Up Overrides](#setting-up-overrides)
3. [Modifying Files](#modifying-files)
4. [Persisting Changes](#persisting-changes)
5. [Use Cases](#use-cases)
6. [Advanced Techniques](#advanced-techniques)
7. [Tips and Best Practices](#tips-and-best-practices)

---

## Getting Started

### What Are Overrides?

Overrides allow you to:
- **Modify HTML, CSS, JavaScript** locally
- **Persist changes** across page reloads
- **Test without deploying**
- **Develop and debug** more efficiently
- **Mock responses** for API testing

### Browser Storage

Overrides stored in:
- `IndexedDB` in your browser
- Specific to your browser profile
- Not shared with other browsers or computers
- Survives browser restart

---

## Setting Up Overrides

### Enable Overrides

**Step 1: Open Sources Panel**
1. Press `F12` to open DevTools
2. Click **Sources** tab
3. On left side, click **Overrides** (may need to scroll)

**Step 2: Select Override Folder**
1. Overrides tab should show empty
2. Click **+ Select folder for overrides**
3. Choose or create local folder
4. Browser asks permission to write to folder
5. Grant permission

**Step 3: Grant Permission**
- Chrome asks for folder access permission
- Click **Allow** to proceed
- Permission is per folder, per browser profile

### Folder Structure

Create folder structure mirroring your site:

```
override-folder/
├─ example.com/
│  ├─ index.html
│  ├─ assets/
│  │  ├─ style.css
│  │  └─ script.js
│  └─ api/
│     └─ data.json
```

When you override `https://example.com/assets/style.css`, it maps to the local file.

---

## Modifying Files

### Method 1: Edit in Sources Panel

**Edit HTML/CSS/JavaScript:**
1. Open file in Sources panel
2. View it's source code
3. Right-click on code → **Edit in sources**
4. Or simply double-click to edit
5. Make changes
6. `Ctrl+S` to save
7. Page updates automatically

**Changes Appear:**
- In Overrides folder
- File created if doesn't exist
- Automatically saved to local folder

### Method 2: Edit in Override Folder

Edit files directly in your override folder:

1. Navigate to override folder on disk
2. Open file in text editor
3. Make changes
4. Save file
5. Refresh page in browser
6. Changes loaded from override folder

### Method 3: Create New Files

**Create File:**
1. Create new file in override folder
2. Name it same as remote file
3. Add your content
4. Save
5. Page loads your override instead of remote

**Example:**
```
Original: https://example.com/config.js
Override: override-folder/example.com/config.js
```

Browser loads your local `config.js` instead of remote.

---

## Persisting Changes

### Auto-Persistence

Changes automatically persist:
1. Edit file in DevTools or on disk
2. Changes saved to override folder
3. Reload page
4. Your changes still there
5. Remote file ignored

### Verification

**Check Override Is Active:**
1. Sources panel, view file
2. Look for banner indicating override
3. Or check Overrides folder on disk
4. File should exist with your changes

**Disable Override:**
1. Delete file from override folder
2. Reload page
3. Original remote file loads

### Clearing Overrides

**Remove Specific File:**
- Delete from override folder
- Refresh page

**Remove All Overrides:**
1. Overrides tab → (⋮) menu
2. Select **Delete all overrides**
3. Clears entire override folder

---

## Use Cases

### Testing CSS Changes

**Scenario:** Want to test new styling before deployment

```css
/* Original CSS */
.button { background: blue; }

/* Override CSS */
.button { 
  background: blue; 
  /* Add testing change */
  box-shadow: 0 0 10px rgba(0,0,0,0.3);
  transform: scale(1.1);
}
```

**Process:**
1. Edit CSS in override
2. Reload page, see changes
3. Test with interaction
4. Copy changes to source files
5. Deploy when ready

### Testing JavaScript Changes

**Scenario:** Want to test bug fix without deployment

```javascript
// Original code (has bug)
function calculate(a, b) {
  return a + b;  // Bug: should be a * b
}

// Override code (fixed)
function calculate(a, b) {
  return a * b;  // Fixed!
}
```

**Process:**
1. Copy source file to override folder
2. Apply fix
3. Test thoroughly
4. Verify no side effects
5. Apply fix to source and deploy

### API Response Mocking

**Scenario:** API endpoint under development, need to mock response

```javascript
// Original: Fetches from API
fetch('/api/users')
  .then(r => r.json())
  .then(data => console.log(data));

// Override: Return mock data
const mockUsers = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];
console.log(mockUsers);
```

**Better Approach:**
```javascript
// Mock fetch globally
const originalFetch = window.fetch;
window.fetch = function(url) {
  if (url === '/api/users') {
    return Promise.resolve({
      json: () => Promise.resolve([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
      ])
    });
  }
  return originalFetch.apply(this, arguments);
};
```

### Testing Different User States

**Scenario:** Test page behavior for different users

```javascript
// Override script
window.currentUser = {
  id: 1,
  name: 'Test Admin',
  role: 'admin',
  permissions: ['edit', 'delete', 'manage-users']
};
```

Application reads `window.currentUser` to determine permissions.

### Content Testing

**Scenario:** Test with different content without changing source

```html
<!-- Original HTML -->
<h1>My Site</h1>

<!-- Override HTML -->
<h1>Testing New Title</h1>
<p>Testing new content...</p>
```

Test layout and styling with different content quickly.

### Third-Party Script Testing

**Scenario:** Test replacing third-party library with alternative

```javascript
// Original: Heavy library
<script src="heavy-library.min.js"></script>

// Override: Lighter alternative
// Create override with lighter library code
// or stub implementation
```

Test if lighter library works.

---

## Advanced Techniques

### Conditional Overrides

Override script that changes based on conditions:

```javascript
// Override script
if (window.location.hostname === 'example.com') {
  // Apply overrides for example.com
  // Keep original code for other domains
}

if (new Date().getHours() > 18) {
  // Test after 6 PM only
  // Different code for different times
}
```

### Version Testing

Test multiple versions:

```
override-folder/
├─ v1/
│  ├─ example.com/
│  └─ config.json
├─ v2/
│  ├─ example.com/
│  └─ config.json
└─ v3/ (current)
   ├─ example.com/
   └─ config.json
```

Switch between versions by changing override folder.

### Shared Overrides

**Document Your Overrides:**
1. Git-ignore your override folder (contains local changes)
2. Create `OVERRIDES.md` documenting:
   - What each override does
   - Why it's needed
   - How to revert

**Example:**
```markdown
# Dev Overrides

## example.com/api/mock.js
Mock API response for development before endpoint complete.
Simulates user list response.

## example.com/styles/theme.css  
Test new color scheme without production impact.
Keep this change temporary.
```

---

## Tips and Best Practices

### Best Practices

1. **Document Changes**
   - Note what you override
   - Explain why
   - Make temporary overrides intentional

2. **Keep Overrides Minimal**
   - Override only what's necessary
   - Full file overrides override entire file
   - Minimize difference from source

3. **Version Control**
   - Keep override folder outside git (if local testing only)
   - Or commit with clear "TESTING" comments
   - Make it obvious these are overrides

4. **Test Thoroughly**
   - Test all affected code paths
   - Test with different user states
   - Check for side effects
   - Verify edge cases

5. **Clean Up**
   - Remove overrides when done testing
   - Don't accumulate obsolete overrides
   - Keep folder organized

### Common Pitfalls

**Not Reloading Page:**
- Edit file, forget to reload
- Changes don't appear
- **Always reload after editing**

**Modifying Original File:**
- Override files stored separately
- Editing source doesn't update overrides
- **Edit either override OR source, not both**

**Forgetting Overrides Are Active:**
- Overrides take precedence
- Local changes persist
- Confusing if you forget they're active
- **Check Sources panel for override indicator**

**Override Folder Permissions:**
- Browser needs write permission
- Grant permission when prompted
- Different browsers/profiles need separate permissions
- **Check browser permissions if files not saving**

### Workflow Example

```
1. Feature request arrives
2. Create override for new feature file
3. Write feature code in override
4. Test thoroughly with live page
5. All tests pass
6. Copy code to source files
7. Delete override
8. Deploy with confidence
```

### Debugging Overrides

**If Overrides Not Working:**
1. Check Sources panel - should show override indicator
2. Verify override folder exists
3. Check browser permissions for override folder
4. Try creating new simple test file
5. Reload page

**Verify Override Active:**
1. Sources panel → select file
2. Look for banner/indicator
3. Or check file timestamp in override folder
4. Should show recent modification

---

## Summary

Overrides are essential for:
- **Testing** changes locally
- **Developing** features offline
- **Mocking** API responses
- **Experimenting** safely
- **Debugging** complex issues
- **Developing** faster without deployment

Master Overrides to accelerate your development workflow.

---

## Related Docs
- [Sources Panel - Debugging](03-sources.md)
- [Elements Panel - DOM Inspection](01-elements.md)
- [Network Panel - Request Blocking](04-network.md)
