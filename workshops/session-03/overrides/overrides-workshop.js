// overrides-workshop.js
// ─────────────────────────────────────────────────────────────────────────────
// Participants override this file via Sources → Save for overrides.
// Change calculateDiscount() return value and workshopConfig.darkMode to see
// the effects on the page without editing the original file.

// ─── Feature flag config ─────────────────────────────────────────────────────
// Override: change darkMode to true to reveal the dark-mode preview panel.

const workshopConfig = {
    darkMode:    false,
    betaSearch:  false,
    adminPanel:  false
};

// ─── Section 3: JS override target ───────────────────────────────────────────
// Override: change the return value to test a different discount percentage.

function calculateDiscount() {
    const originalPrice  = 1299;
    const discountPercent = 10;   // Override: change this to 50 to test 50% off
    const discountAmount  = Math.round(originalPrice * discountPercent / 100);
    const finalPrice      = originalPrice - discountAmount;
    return { originalPrice, discountPercent, discountAmount, finalPrice };
}

function showDiscount() {
    const result = calculateDiscount();
    document.getElementById('discount-output').textContent =
        'Original price:  ₹' + result.originalPrice  + '\n' +
        'Discount:        ' + result.discountPercent + '% (₹' + result.discountAmount + ')\n' +
        'Final price:     ₹' + result.finalPrice;
}

// ─── Section 4: API mock target ──────────────────────────────────────────────

async function loadProducts() {
    const outputElement = document.getElementById('products-output');
    outputElement.textContent = 'Loading /api/workshop-products...';
    try {
        const response = await fetch('/api/workshop-products');
        const products = await response.json();
        outputElement.textContent = JSON.stringify(products, null, 2);
    } catch (error) {
        outputElement.textContent =
            'Request failed: ' + error.message + '\n\n' +
            'Expected — this endpoint does not exist on the server.\n' +
            'Follow the override instructions to create a local mock file.';
    }
}

// ─── Section 5: Feature flag reader ─────────────────────────────────────────

function checkFeatureFlags() {
    const flagsOutput   = document.getElementById('flags-output');
    const darkPreview   = document.getElementById('dark-mode-preview');

    flagsOutput.textContent = JSON.stringify(workshopConfig, null, 2);

    if (workshopConfig.darkMode) {
        darkPreview.style.display = 'block';
    } else {
        darkPreview.style.display = 'none';
    }
}
