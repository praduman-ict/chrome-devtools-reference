// ============================================================
// Activity Answer Key — fixed version of activity-bugs.js
// ============================================================

// --- Bug 1 Fix ---
// i <= items.length  →  i < items.length
// Using <= causes a final iteration where items[i] is undefined,
// throwing "Cannot read properties of undefined".
function calculateTotal(items) {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
        total += items[i].price * items[i].quantity;
    }
    return total;
}

// --- Bug 2 Fix ---
// price * discountPercent  →  price * (discountPercent / 100)
// Without /100, a 10% discount was treated as 10×, making discount = 2000.
function applyDiscount(price, discountPercent) {
    const discount = price * (discountPercent / 100);
    return price - discount;
}

// --- Bug 3 Fix ---
// user.role = 'admin'  →  user.role === 'admin'
// The single = is an assignment, not a comparison. It always sets
// user.role to 'admin' and evaluates as truthy, so the branch was
// always taken (the label appeared correct but the object was mutated).
function getUserLabel(user) {
    if (user.role === 'admin') {
        return 'Admin: ' + user.name;
    }
    return 'User: ' + user.name;
}

// --- Bug 4 Fix ---
// Wrap processPayment in a try/catch so the error is displayed
// in the output element instead of crashing the page.
function processPayment(order) {
    try {
        if (!order.amount) {
            throw new Error('Payment failed: amount is missing');
        }
        document.getElementById('payment-output').textContent =
            'Payment of ' + order.amount + ' processed for ' + order.customer;
    } catch (e) {
        document.getElementById('payment-output').textContent = e.message;
    }
}

// ---- Page wiring — unchanged ----

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
    processPayment({ customer: 'Rahul' });
});
