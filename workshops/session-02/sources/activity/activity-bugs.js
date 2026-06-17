// ============================================================
// Activity: Debug This!
// There are 4 bugs hidden across these functions.
// Use breakpoints, watch expressions, call stack, and the
// console to find and fix each one.
// ============================================================

// --- Bug 1 ---
// calculateTotal() should return the sum of all item prices
// multiplied by their quantities. Something is off.
function calculateTotal(items) {
    let total = 0;
    for (let i = 0; i <= items.length; i++) {   // bug here
        total += items[i].price * items[i].quantity;
    }
    return total;
}

// --- Bug 2 ---
// applyDiscount() should return price reduced by discountPercent.
// e.g. applyDiscount(200, 10) → 180
function applyDiscount(price, discountPercent) {
    const discount = price * discountPercent;   // bug here
    return price - discount;
}

// --- Bug 3 ---
// getUserLabel() should return "Admin: Alice" for an admin user.
// It always returns "User: ..." regardless of role.
function getUserLabel(user) {
    if (user.role = 'admin') {                  // bug here
        return 'Admin: ' + user.name;
    }
    return 'User: ' + user.name;
}

// --- Bug 4 ---
// processPayment() tries to charge the card but throws an
// uncaught error when amount is missing. It should catch the
// error and display it in #payment-output instead of crashing.
function processPayment(order) {
    if (!order.amount) {
        throw new Error('Payment failed: amount is missing'); // bug here — not caught
    }
    document.getElementById('payment-output').textContent =
        'Payment of ' + order.amount + ' processed for ' + order.customer;
}

// ---- Page wiring — do not edit below this line ----

const sampleItems = [
    { name: 'Notebook', price: 120, quantity: 2 },
    { name: 'Pen Set',  price: 80,  quantity: 1 }
];

document.getElementById('btn-total').addEventListener('click', function () {
    try {
        const total = calculateTotal(sampleItems);
        document.getElementById('total-output').textContent = 'Total: ' + total;
    } catch (e) {
        document.getElementById('total-output').textContent = 'Error: ' + e.message;
    }
});

document.getElementById('btn-discount').addEventListener('click', function () {
    const discounted = applyDiscount(200, 10);
    document.getElementById('discount-output').textContent = 'Discounted price: ' + discounted;
});

document.getElementById('btn-label').addEventListener('click', function () {
    const user = { name: 'Alice', role: 'admin' };
    document.getElementById('label-output').textContent = getUserLabel(user);
});

document.getElementById('btn-payment').addEventListener('click', function () {
    processPayment({ customer: 'Rahul' });   // amount intentionally missing
});
