// ─── 1. Recording demo ───────────────────────────────────────────────────────

function onLoadFunction() {
    document.getElementById('recording-output').textContent =
        'onLoadFunction() ran — its lines are now green in Coverage.';
}

// ─── 2. Used functions ───────────────────────────────────────────────────────
// These turn green in Coverage when their buttons are clicked.

function usedFunctionA() {
    const numbers = [4, 8, 15, 16, 23, 42];
    const total   = numbers.reduce((sum, number) => sum + number, 0);
    document.getElementById('used-output').textContent =
        'usedFunctionA() ran. Sum = ' + total;
}

function usedFunctionB() {
    const message = buildGreeting('Workshop');
    document.getElementById('used-output').textContent =
        'usedFunctionB() ran. Message: ' + message;
}

function buildGreeting(name) {
    return 'Hello from ' + name + ' at ' + new Date().toLocaleTimeString();
}

// ─── 2. Unused functions ─────────────────────────────────────────────────────
// These are defined but no button or code ever calls them.
// They will stay RED in Coverage no matter how much you interact with the page.

function unusedFunctionA() {
    const result = performHeavyCalculation(1000);
    console.log('Unused result:', result);
    return result;
}

function performHeavyCalculation(iterations) {
    let total = 0;
    for (let index = 0; index < iterations; index++) {
        total += Math.sqrt(index);
    }
    return total;
}

function unusedFunctionB() {
    const payload = {
        timestamp: Date.now(),
        session:   'workshop',
        data:      generateReportData()
    };
    return JSON.stringify(payload);
}

function generateReportData() {
    return { items: [], total: 0, status: 'empty' };
}

// ─── 3. Conditional paths ────────────────────────────────────────────────────

function conditionalDemo(condition) {
    const output = document.getElementById('conditional-output');
    if (condition) {
        // This branch runs only when you click "Trigger IF branch"
        const value = condition ? 'truthy' : 'never';
        output.textContent = 'IF branch executed. condition was: ' + value;
    } else {
        // This branch runs only when you click "Trigger ELSE branch"
        const fallback = 'default value applied';
        output.textContent = 'ELSE branch executed. ' + fallback;
    }
}

// ─── 4. Feature flag code ────────────────────────────────────────────────────
// All flags are false — the functions below can never be reached.

const featureFlags = {
    darkMode:    false,
    betaSearch:  false,
    adminPanel:  false
};

function runFeatureCheck() {
    if (featureFlags.darkMode) {
        enableDarkMode();
    } else if (featureFlags.betaSearch) {
        enableBetaSearch();
    } else if (featureFlags.adminPanel) {
        enableAdminPanel();
    } else {
        document.getElementById('feature-output').textContent =
            'All feature flags are off — enableDarkMode, enableBetaSearch, and enableAdminPanel stay red in Coverage.';
    }
}

function enableDarkMode() {
    // Unreachable — featureFlags.darkMode is always false
    document.body.style.background = '#1e1e1e';
    document.body.style.color      = '#d4d4d4';
    console.log('Dark mode enabled');
}

function enableBetaSearch() {
    // Unreachable — featureFlags.betaSearch is always false
    const searchInput = document.createElement('input');
    searchInput.placeholder = 'Beta search...';
    document.body.prepend(searchInput);
}

function enableAdminPanel() {
    // Unreachable — featureFlags.adminPanel is always false
    const adminBanner = document.createElement('div');
    adminBanner.className   = 'admin-only-banner';
    adminBanner.textContent = 'Admin panel active';
    document.body.prepend(adminBanner);
}

// ─── 5. CSS coverage toggle ──────────────────────────────────────────────────

function toggleHighlight() {
    const targetElement = document.getElementById('highlight-target');
    const isHighlighted = targetElement.classList.contains('highlight-active');
    if (isHighlighted) {
        targetElement.classList.remove('highlight-active');
        targetElement.style.cssText = 'padding:14px;border:2px solid #999;border-radius:4px;margin:8px 0;';
        targetElement.textContent = 'Highlight removed. .highlight-active is now unused again — but Coverage already saw it.';
    } else {
        targetElement.classList.add('highlight-active');
        targetElement.style.cssText = '';
        targetElement.textContent = '.highlight-active is now applied — this CSS rule turns green in Coverage.';
    }
}

// ─── 6. Run all demos ────────────────────────────────────────────────────────

function runAllDemos() {
    onLoadFunction();
    usedFunctionA();
    usedFunctionB();
    conditionalDemo(true);
    conditionalDemo(false);
    runFeatureCheck();
    document.getElementById('all-output').textContent =
        'All callable demo functions have now run.\n' +
        'Check Coverage — used functions are green, unused ones (unusedFunctionA/B etc.) stay red.';
}
