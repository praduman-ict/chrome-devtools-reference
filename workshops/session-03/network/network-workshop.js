// ─── Shared helpers ──────────────────────────────────────────────────────────

const BASE = 'https://jsonplaceholder.typicode.com';

function setOutput(id, text) {
    document.getElementById(id).textContent = text;
}

// ─── 1. Recording, Preserve Log, Clear ───────────────────────────────────────

function makeBasicRequest() {
    setOutput('recording-output', 'Fetching...');
    fetch(BASE + '/posts/1')
        .then(response => response.json())
        .then(data => {
            setOutput('recording-output',
                'Request complete. Look at the Network panel — a new row appeared.\n' +
                'Title: ' + data.title);
        })
        .catch(error => setOutput('recording-output', 'Error: ' + error.message));
}

function reloadPage() {
    location.reload();
}

// ─── 2. Request Table Columns ─────────────────────────────────────────────────

function fetchPost(id) {
    setOutput('columns-output', 'Fetching post ' + id + '...');
    fetch(BASE + '/posts/' + id)
        .then(response => response.json())
        .then(data => {
            setOutput('columns-output',
                'Status 200 — post loaded.\n' +
                'Check the Network row: Name, Status (200), Type (fetch), Initiator, Size, Time.');
        });
}

function fetch404() {
    // jsonplaceholder returns 404 for id 99999
    setOutput('columns-output', 'Fetching a resource that does not exist...');
    fetch(BASE + '/posts/99999999')
        .then(response => {
            setOutput('columns-output',
                'Status: ' + response.status + '\n' +
                'In the Network panel the row turns red — Status column shows 404.');
        })
        .catch(error => setOutput('columns-output', 'Network error: ' + error.message));
}

function fetchLargePayload() {
    setOutput('columns-output', 'Fetching all posts (large payload)...');
    fetch(BASE + '/posts')
        .then(response => response.json())
        .then(data => {
            setOutput('columns-output',
                'Loaded ' + data.length + ' posts.\n' +
                'Check the Size column — this response is larger than a single post.');
        });
}

// ─── 3. Request Detail Tabs ───────────────────────────────────────────────────

// 3.1 Headers
function fetchWithCustomHeaders() {
    setOutput('headers-output', 'Sending request with custom headers...');
    fetch(BASE + '/posts/1', {
        headers: {
            'Accept':       'application/json',
            'X-Workshop':   'session-03',
            'X-Request-Id': 'demo-' + Date.now()
        }
    })
    .then(response => response.json())
    .then(() => {
        setOutput('headers-output',
            'Done. Click the request in Network → Headers tab.\n' +
            'Look for X-Workshop and X-Request-Id under Request Headers.\n' +
            'Also check Response Headers for Content-Type and Cache-Control.');
    });
}

// 3.2 Payload
function sendPostRequest() {
    setOutput('payload-output', 'Sending POST request...');
    fetch(BASE + '/posts', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title:  'Workshop POST Demo',
            body:   'This body was sent as a JSON payload.',
            userId: 1
        })
    })
    .then(response => response.json())
    .then(data => {
        setOutput('payload-output',
            'POST complete. Server echoed id: ' + data.id + '\n' +
            'Click the request in Network → Payload tab to see the JSON body that was sent.');
    });
}

// 3.3 Preview
function fetchForPreview() {
    setOutput('preview-output', 'Fetching...');
    fetch(BASE + '/users/1')
        .then(response => response.json())
        .then(data => {
            setOutput('preview-output',
                'Done. Click the request in Network → Preview tab.\n' +
                'DevTools renders the JSON as an expandable tree — easier to read than raw text.');
        });
}

// 3.4 Response
function fetchForResponse() {
    setOutput('response-output', 'Fetching...');
    fetch(BASE + '/posts/2')
        .then(response => response.json())
        .then(data => {
            setOutput('response-output',
                'Done. Click the request in Network → Response tab.\n' +
                'You see the raw response body string exactly as the server sent it.');
        });
}

// 3.5 Timing
function fetchForTiming() {
    setOutput('timing-output', 'Fetching...');
    fetch(BASE + '/posts/3')
        .then(response => response.json())
        .then(() => {
            setOutput('timing-output',
                'Done. Click the request in Network → Timing tab.\n' +
                'Look for TTFB (Waiting) — this is how long the server took to respond.');
        });
}

// ─── 4. XHR vs Fetch ─────────────────────────────────────────────────────────

function makeFetchRequest() {
    fetch(BASE + '/posts/10')
        .then(response => response.json())
        .then(data => {
            setOutput('xhr-fetch-output',
                'Fetch request complete (Type: fetch).\n' +
                'In Network: click Fetch/XHR filter — look at the Type column.');
        });
}

function makeXHRRequest() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', BASE + '/posts/11');
    xhr.onload = function () {
        setOutput('xhr-fetch-output',
            'XHR request complete (Type: xhr).\n' +
            'In Network: click Fetch/XHR filter — this row shows as "xhr" in the Type column.');
    };
    xhr.onerror = function () {
        setOutput('xhr-fetch-output', 'XHR error.');
    };
    xhr.send();
}

// ─── 5. Filtering by Type ─────────────────────────────────────────────────────

function loadScript() {
    // Dynamically create and remove a script tag to trigger a JS request
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js';
    script.onload = () => {
        setOutput('filter-type-output', 'Script loaded. Filter by JS in Network to see it.');
        document.head.removeChild(script);
    };
    document.head.appendChild(script);
}

function loadStylesheet() {
    const link = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css';
    link.onload = () => {
        setOutput('filter-type-output', 'Stylesheet loaded. Filter by CSS in Network to see it.');
    };
    document.head.appendChild(link);
}

function loadImage() {
    const img = new Image();
    img.onload = () => {
        setOutput('filter-type-output', 'Image loaded. Filter by Img in Network to see it.');
    };
    img.src = 'https://picsum.photos/seed/workshop/80/80';
}

// ─── 6. Advanced Filters — requests are shared with other sections ────────────
// fetch404(), fetchLargePayload(), makeFetchRequest() already defined above.
// Section 6 just needs the output updated when those fire.

// ─── 7. Network Throttling ────────────────────────────────────────────────────

function fetchForThrottle() {
    setOutput('throttle-output', 'Fetching — check the Time column in Network...');
    const startTime = Date.now();
    fetch(BASE + '/posts/20')
        .then(response => response.json())
        .then(() => {
            const elapsed = Date.now() - startTime;
            setOutput('throttle-output',
                'Completed in ~' + elapsed + ' ms (page-side measurement).\n' +
                'Compare the Network panel Time column at different throttle settings.');
        })
        .catch(error => {
            setOutput('throttle-output', 'Failed (possibly Offline mode): ' + error.message);
        });
}

function fetchMultipleForThrottle() {
    setOutput('throttle-output', 'Fetching multiple requests — watch the waterfall...');
    const startTime = Date.now();
    Promise.all([
        fetch(BASE + '/posts/21').then(r => r.json()),
        fetch(BASE + '/posts/22').then(r => r.json()),
        fetch(BASE + '/posts/23').then(r => r.json())
    ])
    .then(() => {
        const elapsed = Date.now() - startTime;
        setOutput('throttle-output',
            'All 3 requests done in ~' + elapsed + ' ms.\n' +
            'Try Slow 3G — the waterfall bars stretch and the total time increases significantly.');
    })
    .catch(error => {
        setOutput('throttle-output', 'Failed (possibly Offline mode): ' + error.message);
    });
}

// ─── 8. Request Blocking ──────────────────────────────────────────────────────

function fetchBlockableRequest() {
    setOutput('blocking-output', 'Fetching /todos/5...');
    fetch(BASE + '/todos/5')
        .then(response => response.json())
        .then(data => {
            setOutput('blocking-output',
                'Request succeeded: ' + JSON.stringify(data) + '\n\n' +
                'Now block it: Network → ⋮ → Request blocking → Enable → + → enter "todos/5"\n' +
                'Then click again — it will fail.');
        })
        .catch(error => {
            setOutput('blocking-output',
                'Request blocked or failed: ' + error.message + '\n' +
                'The Network row shows (blocked:devtools) and the app receives a network error.');
        });
}

function loadBlockableImage() {
    const container = document.getElementById('blockable-image-container');
    container.innerHTML = '';
    setOutput('blocking-output', 'Loading image from picsum.photos...');
    const img = document.createElement('img');
    img.src    = 'https://picsum.photos/seed/block-demo/200/80';
    img.alt    = 'Blockable image';
    img.style.cssText = 'max-width:100%;border:1px solid #ccc;margin-top:8px;border-radius:4px;';
    img.onload = () => {
        setOutput('blocking-output',
            'Image loaded.\n' +
            'Block it: enter "picsum" as the pattern, then click again to see it fail.');
    };
    img.onerror = () => {
        setOutput('blocking-output',
            'Image blocked — container is empty.\n' +
            'The Network row shows the block error.');
        container.innerHTML = '<p style="color:#dc3545;font-size:13px;">Image failed to load (request blocked).</p>';
    };
    container.appendChild(img);
}

// ─── 9. Timing Analysis and TTFB ─────────────────────────────────────────────

function fetchForTimingAnalysis() {
    setOutput('timing-analysis-output', 'Fetching — then click the row in Network → Timing tab...');
    fetch(BASE + '/comments?postId=1')
        .then(response => response.json())
        .then(data => {
            setOutput('timing-analysis-output',
                'Loaded ' + data.length + ' comments.\n' +
                'Click the request row → Timing tab.\n' +
                'The largest bar is usually "Waiting (TTFB)" — server processing time.');
        });
}

function fetchMultipleForWaterfall() {
    setOutput('timing-analysis-output', 'Fetching multiple — observe waterfall overlaps...');
    Promise.all([
        fetch(BASE + '/posts/1').then(r => r.json()),
        fetch(BASE + '/posts/2').then(r => r.json()),
        fetch(BASE + '/posts/3').then(r => r.json()),
        fetch(BASE + '/posts/4').then(r => r.json()),
        fetch(BASE + '/posts/5').then(r => r.json())
    ]).then(() => {
        setOutput('timing-analysis-output',
            '5 requests complete.\n' +
            'In the waterfall, the bars should overlap — all 5 fired in parallel.\n' +
            'Each bar still shows its own TTFB in the Timing tab.');
    });
}

// ─── 10. Copy as cURL ─────────────────────────────────────────────────────────

function fetchForCurl() {
    setOutput('curl-output', 'Fetching...');
    fetch(BASE + '/posts/42', {
        headers: { 'Accept': 'application/json' }
    })
    .then(response => response.json())
    .then(() => {
        setOutput('curl-output',
            'Request complete.\n' +
            'Right-click the row in Network → Copy → Copy as cURL (bash).\n' +
            'Paste into a terminal to replay the exact same request outside the browser.');
    });
}

// ─── 11. Disable Cache ────────────────────────────────────────────────────────

function fetchCacheable() {
    setOutput('cache-output', 'Fetching...');
    fetch(BASE + '/posts/50')
        .then(response => {
            const cacheHeader = response.headers.get('cache-control') || 'not set';
            return response.json().then(data => ({ data, cacheHeader }));
        })
        .then(({ data, cacheHeader }) => {
            setOutput('cache-output',
                'Done. Cache-Control header: ' + cacheHeader + '\n\n' +
                'Click again. The second request may show "from disk cache" in the Size column.\n' +
                'Enable "Disable cache" in Network settings, then reload to always hit the network.');
        });
}

// ─── 12. Waterfall — Parallel vs Sequential ───────────────────────────────────

function loadParallel() {
    setOutput('waterfall-output', 'Launching 4 requests in parallel (Promise.all)...');
    const startTime = Date.now();
    Promise.all([
        fetch(BASE + '/posts/61').then(r => r.json()),
        fetch(BASE + '/posts/62').then(r => r.json()),
        fetch(BASE + '/posts/63').then(r => r.json()),
        fetch(BASE + '/posts/64').then(r => r.json())
    ]).then(() => {
        setOutput('waterfall-output',
            'Parallel complete in ~' + (Date.now() - startTime) + ' ms.\n' +
            'In the waterfall the 4 bars overlap — they all started at the same time.');
    });
}

async function loadSequential() {
    setOutput('waterfall-output', 'Fetching 4 requests one after another (await)...');
    const startTime = Date.now();
    await fetch(BASE + '/posts/71').then(r => r.json());
    await fetch(BASE + '/posts/72').then(r => r.json());
    await fetch(BASE + '/posts/73').then(r => r.json());
    await fetch(BASE + '/posts/74').then(r => r.json());
    setOutput('waterfall-output',
        'Sequential complete in ~' + (Date.now() - startTime) + ' ms.\n' +
        'In the waterfall the 4 bars form a chain — each started only after the previous finished.\n' +
        'Total time is roughly 4× a single request.');
}
