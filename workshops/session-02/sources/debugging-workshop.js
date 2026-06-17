// ─── Shared Data ────────────────────────────────────────────────────────────

const cartItems = [
    { sku: 'BK-101', name: 'Notebook', price: 120, quantity: 2 },
    { sku: 'PN-204', name: 'Pen Set', price: 80, quantity: 1 },
    { sku: 'BG-315', name: 'Canvas Bag', price: 450, quantity: 1 }
];

const orders = [
    { id: 501, customer: 'Asha',  total: 1290, status: 'paid' },
    { id: 502, customer: 'Rahul', total: 640,  status: 'failed' },
    { id: 503, customer: 'Meera', total: 2300, status: 'paid' },
    { id: 504, customer: 'Dev',   total: 150,  status: 'failed' }
];

const tasks = [
    { id: 101, title: 'Open Sources panel',          done: true  },
    { id: 102, title: 'Set a conditional breakpoint', done: false },
    { id: 103, title: 'Inspect a call stack',         done: false }
];

const debugLabState = { cartItems, orders, tasks, lastAction: 'Page loaded' };
window.debugLabState = debugLabState;

// ─── 1. Step Through Code ────────────────────────────────────────────────────
// Set a breakpoint on the first line of stepThroughDemo().
// Use F10 (Step Over) to move line by line.
// Use F11 (Step Into) to enter applyTax() and formatPrice().
// Use Shift+F11 (Step Out) to return to the caller.

function applyTax(amount, rate) {
    const tax = amount * rate;           // Step Into lands here
    return amount + tax;
}

function formatPrice(value) {
    return '$' + value.toFixed(2);       // Step Into lands here
}

function stepThroughDemo() {
    const basePrice = 200;
    const priceWithTax = applyTax(basePrice, 0.18);   // F11 steps into applyTax
    const label = formatPrice(priceWithTax);           // F11 steps into formatPrice
    document.getElementById('step-output').textContent = 'Result: ' + label;
}

// ─── 2 & 3. Conditional Breakpoint / Logpoints ──────────────────────────────
// For section 2: right-click the `const message` line inside the loop,
//   Add conditional breakpoint → order.status === 'failed'
// For section 3: right-click the same line,
//   Add logpoint → Order ${order.id}: ${order.status}

function processOrders() {
    const report = [];
    for (const order of orders) {
        const message = buildOrderMessage(order);   // set breakpoint / logpoint here
        report.push(message);
    }
    debugLabState.lastAction = 'Processed orders';
    const out = report.join('\n');
    document.getElementById('orders-output').textContent  = out;
    document.getElementById('logpoint-output').textContent = 'Check the Console for logpoint output.';
}

function buildOrderMessage(order) {
    if (order.status === 'failed') {
        return 'Order ' + order.id + ' needs review for ' + order.customer;
    }
    return 'Order ' + order.id + ' is ready for fulfillment';
}

// ─── 4. Watch Expressions ────────────────────────────────────────────────────
// Set a breakpoint inside calculateCartTotal().
// Add watch expressions: subtotal, discount, finalTotal, couponCode === 'SESSION2'

function runCartCalculation() {
    const result = calculateCartTotal(cartItems, 'SESSION2');
    debugLabState.lastAction = 'Calculated cart total';
    document.getElementById('cart-output').textContent =
        'Subtotal: '    + result.subtotal  +
        '\nDiscount: '  + result.discount  +
        '\nFinal total: '+ result.finalTotal;
}

function calculateCartTotal(items, couponCode) {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount  = getDiscount(subtotal, couponCode);   // set breakpoint here
    const finalTotal = subtotal - discount;
    return { subtotal, discount, finalTotal };
}

function getDiscount(subtotal, couponCode) {
    if (couponCode === 'SESSION2' && subtotal > 500) {
        return Math.round(subtotal * 0.1);
    }
    return 0;
}

function resetCart() {
    debugLabState.lastAction = 'Reset cart output';
    document.getElementById('cart-output').textContent = 'Cart result will appear here.';
}

// ─── 5. Call Stack Analysis ──────────────────────────────────────────────────
// Set a breakpoint inside formatInvoiceNumber().
// Call Stack pane will show: formatInvoiceNumber → buildInvoice → createInvoice

function createInvoice() {
    const invoice = buildInvoice('CUST-42', cartItems);
    debugLabState.lastAction = 'Created invoice';
    document.getElementById('invoice-output').textContent =
        invoice.invoiceNumber + ' created for ' + invoice.customerId +
        '\nAmount: ' + invoice.amount;
}

function buildInvoice(customerId, items) {
    const amount        = calculateCartTotal(items, 'SESSION2').finalTotal;
    const invoiceNumber = formatInvoiceNumber(customerId, new Date());
    return { customerId, amount, invoiceNumber };
}

function formatInvoiceNumber(customerId, date) {
    const year  = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day   = String(date.getDate()).padStart(2, '0');
    return 'INV-' + year + month + day + '-' + customerId;  // set breakpoint here
}

// ─── 6. Pause on Exceptions ──────────────────────────────────────────────────
// Enable "Pause on caught exceptions" in the Breakpoints section.
// Leave Name or Role empty and click Save. DevTools pauses at the throw line.

function saveProfile() {
    try {
        const profile = readProfileForm();
        validateProfile(profile);
        debugLabState.lastAction = 'Saved profile';
        document.getElementById('profile-output').textContent =
            'Saved profile for ' + profile.name + ' as ' + profile.role;
    } catch (error) {
        debugLabState.lastAction = 'Profile validation failed';
        document.getElementById('profile-output').textContent = error.message;
    }
}

function readProfileForm() {
    return {
        name: document.getElementById('profile-name').value.trim(),
        role: document.getElementById('profile-role').value
    };
}

function validateProfile(profile) {
    if (!profile.name) throw new Error('Name is required before saving a profile.');
    if (!profile.role) throw new Error('Role is required before saving a profile.');
}

// 6.2 Uncaught Exception
// Enable "Pause on uncaught exceptions" before clicking.
// The error is NOT wrapped in try...catch — DevTools pauses right at the throw.
function testUncaughtException() {
    const output = document.getElementById('uncaught-output');
    output.textContent = 'About to throw an uncaught exception...';
    // Intentional uncaught throw — DevTools pauses here when the setting is enabled
    throw new Error('Uncaught: something went wrong unexpectedly');
}

// ─── 7. DOM Breakpoints ──────────────────────────────────────────────────────

function domChangeDemo() {
    const target = document.getElementById('mutation-target');
    target.textContent      = 'Content modified!';
    target.style.background = 'lightgreen';
}

function attributeChangeDemo() {
    const targetElement = document.getElementById('attribute-target');
    targetElement.classList.toggle('highlighted');
    targetElement.textContent = 'Class changed to: ' + targetElement.className;
}

function nodeRemovalDemo() {
    const containerElement = document.getElementById('removal-container');
    if (containerElement) containerElement.remove();
}

// ─── 7.4 Global DOM Removal Intercept ───────────────────────────────────────
// The intercept toggle patches Element.prototype.remove so that ANY element
// removed by ANY code triggers a debugger pause + console.trace.
// This solves the case where an element is removed before you can right-click
// it in the Elements panel (e.g. during page load or inside a third-party script).

let originalRemove = null;

function toggleGlobalRemovalIntercept() {
    const toggleBtn    = document.getElementById('intercept-toggle-btn');
    const statusOutput = document.getElementById('intercept-status');

    if (originalRemove) {
        // Disable — restore the original
        Element.prototype.remove = originalRemove;
        originalRemove = null;
        toggleBtn.textContent       = 'Enable Global Removal Intercept';
        toggleBtn.style.background  = '#28a745';
        statusOutput.textContent    = 'Intercept is OFF — removals will not be caught.';
    } else {
        // Enable — patch the prototype
        originalRemove = Element.prototype.remove;
        Element.prototype.remove = function () {
            console.trace('remove() called on', this);
            debugger; // DevTools pauses here — check Call Stack to see who triggered removal
            return originalRemove.call(this);
        };
        toggleBtn.textContent       = 'Disable Global Removal Intercept';
        toggleBtn.style.background  = '#dc3545';
        statusOutput.textContent    = 'Intercept is ON — any .remove() call will trigger a debugger pause.';
    }
}

function removeInterceptTarget() {
    const interceptTarget = document.getElementById('removal-container-2');
    if (interceptTarget) {
        interceptTarget.remove(); // if intercept is ON, DevTools will pause inside the patched remove()
    } else {
        document.getElementById('intercept-status').textContent =
            'Element already removed — click Reset to bring it back.';
    }
}

function resetInterceptTarget() {
    let interceptTarget = document.getElementById('removal-container-2');
    if (!interceptTarget) {
        interceptTarget = document.createElement('div');
        interceptTarget.id = 'removal-container-2';
        interceptTarget.style.cssText = 'padding:10px;margin:10px 0;border:2px dashed purple;background:#f5eeff;';
        interceptTarget.textContent = 'Intercept target — click "Remove an Element" to trigger removal';
        const statusOutput = document.getElementById('intercept-status');
        statusOutput.parentNode.insertBefore(interceptTarget, statusOutput.nextSibling);
    }
    document.getElementById('intercept-status').textContent =
        originalRemove
            ? 'Intercept is ON — element restored. Click "Remove an Element" again.'
            : 'Intercept is OFF — element restored.';
}

// ─── 8. Event Listener Breakpoints ──────────────────────────────────────────

// 8.1 Keyboard — keydown
document.getElementById('search-box').addEventListener('keydown', function handleSearchKeydown(event) {
    debugLabState.lastAction = 'keydown: ' + event.key;
    document.getElementById('search-output').textContent =
        'keydown — Key: ' + event.key + '\nValue before update: ' + event.target.value;
});

document.getElementById('keyboard-reset').addEventListener('click', function clearSearch() {
    document.getElementById('search-box').value = '';
    document.getElementById('search-output').textContent = 'Search cleared.';
});

// 8.2 Mouse — click / dblclick / mouseup
const mouseTarget = document.getElementById('mouse-target');

mouseTarget.addEventListener('click', function handleClick() {
    debugLabState.lastAction = 'mouse click';
    document.getElementById('mouse-output').textContent = 'click fired at ' + new Date().toLocaleTimeString();
});

mouseTarget.addEventListener('dblclick', function handleDblClick() {
    debugLabState.lastAction = 'mouse dblclick';
    document.getElementById('mouse-output').textContent = 'dblclick fired at ' + new Date().toLocaleTimeString();
});

mouseTarget.addEventListener('mouseup', function handleMouseUp(event) {
    debugLabState.lastAction = 'mouseup';
    document.getElementById('mouse-output').textContent =
        'mouseup — button: ' + event.button + ' (0=left, 1=middle, 2=right)';
});

// 8.3 Mouse — mouseover / mouseenter
const hoverTarget = document.getElementById('hover-target');

hoverTarget.addEventListener('mouseover', function handleMouseOver() {
    debugLabState.lastAction = 'mouseover';
    document.getElementById('hover-output').textContent = 'mouseover fired at ' + new Date().toLocaleTimeString();
});

hoverTarget.addEventListener('mouseenter', function handleMouseEnter() {
    debugLabState.lastAction = 'mouseenter';
    document.getElementById('hover-output').textContent = 'mouseenter fired at ' + new Date().toLocaleTimeString();
});

// 8.4 Mouse — wheel
document.getElementById('wheel-target').addEventListener('wheel', function handleWheel(event) {
    debugLabState.lastAction = 'wheel';
    document.getElementById('wheel-output').textContent =
        'wheel — deltaY: ' + Math.round(event.deltaY) + ', deltaX: ' + Math.round(event.deltaX);
});

// ─── 9. XHR / Fetch Breakpoints ─────────────────────────────────────────────

async function loadRemoteTodo() {
    const output = document.getElementById('fetch-output');
    output.textContent = 'Loading remote todo...';
    debugLabState.lastAction = 'Started remote todo request';
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        const todo = await response.json();
        debugLabState.lastAction = 'Loaded remote todo';
        output.textContent = JSON.stringify(todo, null, 2);
    } catch (error) {
        debugLabState.lastAction = 'Remote todo request failed';
        output.textContent = 'Request failed: ' + error.message;
    }
}

// ─── 10. Debugger Statement ──────────────────────────────────────────────────

function debuggerDemo() {
    const value = 42;
    debugger;  // Execution pauses here — no manual breakpoint needed
    document.getElementById('debugger-output').textContent =
        'Resumed after debugger statement. value = ' + value;
}

// ─── 11. Snippet Practice ────────────────────────────────────────────────────

function exposeDebugState() {
    window.debugLabState = debugLabState;
    document.getElementById('snippet-output').textContent =
        'window.debugLabState is ready. Create a Snippet with:\n' +
        'console.table(window.debugLabState.tasks);\n' +
        'window.debugLabState.tasks.filter(t => t.done).length;';
}

// ─── Init ────────────────────────────────────────────────────────────────────
renderTasks();
