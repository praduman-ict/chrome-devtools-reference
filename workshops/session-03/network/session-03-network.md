# Network Panel: Monitoring and API Debugging

The Network panel records every resource the browser loads — HTML, CSS, JavaScript, images, fonts, API calls, and WebSocket messages. It is the primary tool for understanding request lifecycles, debugging API behavior, measuring load performance, and testing how the app responds to network failures.

---

## Table of Contents

1. [Session Goal](#session-goal)
2. [Demo File](#demo-file)
3. [Network Panel Layout](#network-panel-layout)
4. [Recording, Preserve Log, and Clear](#recording-preserve-log-and-clear)
5. [Request Table Columns](#request-table-columns)
6. [Request Detail Tabs](#request-detail-tabs)
7. [XHR vs Fetch](#xhr-vs-fetch)
8. [Filtering by Resource Type](#filtering-by-resource-type)
9. [Advanced Filter Queries](#advanced-filter-queries)
10. [Network Throttling and Offline Mode](#network-throttling-and-offline-mode)
11. [Request Blocking](#request-blocking)
12. [Timing Analysis and TTFB](#timing-analysis-and-ttfb)
13. [Copy as cURL](#copy-as-curl)
14. [Disable Cache](#disable-cache)
15. [Waterfall — Parallel vs Sequential](#waterfall--parallel-vs-sequential)
16. [Guided Practice](#guided-practice)
17. [Debugging Checklist](#debugging-checklist)

**Demo file:**

```text
Chrome-DevTools-Reference/workshops/session-03/network/network-workshop.html
```

---

## Session Goal

By the end of this session, participants should be able to:

- Open the Network panel and understand what is recorded.
- Use Preserve log and Clear to control the request list.
- Read the Name, Status, Type, Initiator, Size, and Time columns.
- Inspect Headers, Payload, Preview, Response, and Timing for any request.
- Distinguish XHR from Fetch requests.
- Filter requests by type, status code, domain, and size.
- Use advanced filter queries like `status-code:404` and `larger-than:10k`.
- Simulate slow connections with throttle profiles and test Offline mode.
- Block requests to test error handling.
- Read the Timing tab and understand TTFB.
- Copy a request as a cURL command to replay outside the browser.
- Disable the browser cache during debugging.
- Explain the difference between parallel and sequential loading in the waterfall.

---

## Demo File

```text
Chrome-DevTools-Reference/workshops/session-03/network/network-workshop.html
Chrome-DevTools-Reference/workshops/session-03/network/network-workshop.js
```

Recommended setup:

1. Open `network-workshop.html` in Chrome.
2. Open DevTools (`F12`).
3. Go to the **Network** panel — open it before clicking any buttons.
4. Keep the Network panel visible throughout the session.

### Section Map

| # | Section | Key Technique |
|---|---|---|
| 1 | Recording, Preserve Log, Clear | Understand what gets recorded and when |
| 2 | Request Table Columns | Name, Status, Type, Initiator, Size, Time |
| 3 | Request Detail Tabs | Headers, Payload, Preview, Response, Timing |
| 4 | XHR vs Fetch | Type column, Fetch/XHR filter |
| 5 | Filtering by Type | Type filter buttons in toolbar |
| 6 | Advanced Filter Queries | `status-code:`, `type:`, `larger-than:`, `domain:` |
| 7 | Network Throttling | Slow 3G, Fast 3G, Offline |
| 8 | Request Blocking | Block by URL pattern |
| 9 | Timing Analysis and TTFB | Timing tab phases |
| 10 | Copy as cURL | Export and replay requests |
| 11 | Disable Cache | Force fresh network requests |
| 12 | Waterfall | Parallel vs sequential request loading |

---

## Network Panel Layout

| Area | What it shows |
|---|---|
| Toolbar | Record button, Clear, Filter bar, type buttons, throttle dropdown, settings |
| Request list | Every resource loaded — one row per request |
| Summary bar | Total requests, transferred size, finish time |
| Detail pane | Opens when you click a row — tabs: Headers, Payload, Preview, Response, Timing |

### Useful Shortcuts

| Action | Windows/Linux | macOS |
|---|---|---|
| Open Network panel | `Ctrl+Shift+I` → Network | `Cmd+Option+I` → Network |
| Clear log | `Ctrl+L` | `Cmd+K` |
| Search in requests | `Ctrl+F` | `Cmd+F` |

---

## Recording, Preserve Log, and Clear

The Network panel records automatically as soon as it is open.

### Preserve Log

By default the request list clears on every page navigation or reload. Enable **Preserve log** to keep all previous requests visible across reloads — useful when debugging what happens during login redirects or multi-step flows.

1. Check **Preserve log** in the Network toolbar.
2. Click **Reload Page** on the demo.
3. Confirm the previous rows are still there.
4. Uncheck it and reload again — the list clears.

### Clear

The Clear button (🗑) removes all rows from the list without stopping recording. New requests appear immediately after clearing.

---

## Request Table Columns

| Column | What it shows |
|---|---|
| Name | File name or last URL segment. Hover for full URL. |
| Status | HTTP status code. Green = 2xx success, red = 4xx/5xx error. |
| Type | Resource type: `fetch`, `xhr`, `script`, `stylesheet`, `img`, `document`, etc. |
| Initiator | Script file and line number that triggered the request. Click to jump to Sources. |
| Size | Bytes transferred over the network. Shows "from disk cache" for cached responses. |
| Time | Total duration from request sent to last byte received. |

### Status Code Colours

| Range | Colour | Meaning |
|---|---|---|
| 200–299 | Green | Success |
| 300–399 | Blue/grey | Redirect |
| 400–499 | Red | Client error (404 Not Found, 401 Unauthorised) |
| 500–599 | Red | Server error |

### Demo

1. Click **Fetch Post (200)** — row shows green, Status = 200.
2. Click **Fetch Missing (404)** — row turns red, Status = 404.
3. Click **Fetch Large Payload** — Size column shows a larger value than the single-post request.

---

## Request Detail Tabs

Click any row in the Network panel to open the detail pane on the right.

### Headers

Shows three sections:

- **General** — Request URL, method, status code, remote IP address.
- **Response Headers** — Headers the server sent back: `Content-Type`, `Cache-Control`, `Set-Cookie`, CORS headers.
- **Request Headers** — Headers the browser sent: `User-Agent`, `Accept`, `Cookie`, any custom headers.

#### Demo

Click **Send Request with Custom Headers**. In the request's Headers tab look for `X-Workshop: session-03` and `X-Request-Id` under Request Headers.

### Payload

Appears for requests that send a body (POST, PUT, PATCH). Shows the JSON or form data that was sent.

#### Demo

Click **Send POST with Body**. In the Payload tab you see the JSON object that was posted.

### Preview

Renders the response in a structured format:

- JSON → expandable tree
- HTML → rendered page
- Images → image preview

Use Preview when you want to navigate a large JSON structure without reading raw text.

### Response

Raw response body — the exact string the server returned. Use this when:

- The server returned unexpected content.
- You need to copy the raw data.
- Preview is not rendering correctly.

### Timing

Detailed breakdown of every phase of the request lifecycle. See [Timing Analysis and TTFB](#timing-analysis-and-ttfb) for the full breakdown.

---

## XHR vs Fetch

Both are used for JavaScript-initiated HTTP requests but they are different browser APIs.

| | XMLHttpRequest (XHR) | Fetch API |
|---|---|---|
| API style | Callback-based | Promise-based |
| Type column | `xhr` | `fetch` |
| Filter button | Fetch/XHR | Fetch/XHR |
| Usage today | Legacy code, older libraries | Modern code, `async/await` |

### Demo

1. Click **Make Fetch Request** — row shows Type = `fetch`.
2. Click **Make XHR Request** — row shows Type = `xhr`.
3. Click the **Fetch/XHR** filter button to isolate both, then read the Type column.

---

## Filtering by Resource Type

The filter buttons in the Network toolbar show only requests of the selected type.

| Button | Shows |
|---|---|
| All | Everything |
| Fetch/XHR | `fetch` and `xhr` requests |
| JS | JavaScript files |
| CSS | Stylesheets |
| Img | Images |
| Media | Audio and video |
| Font | Web fonts |
| Doc | HTML documents |
| WS | WebSocket connections |
| Other | Everything else |

Hold `Shift` (or `Cmd` on macOS) and click multiple buttons to combine filters.

### Demo

1. Click **Load Script**, **Load Stylesheet**, **Load Image**, **Make API Call** to trigger all four types.
2. Click each type filter button in turn and observe which rows disappear.

---

## Advanced Filter Queries

Type directly into the filter text input to apply property-based filters.

| Query | Effect |
|---|---|
| `status-code:404` | Only 404 responses |
| `status-code:200` | Only 200 responses |
| `resource-type:fetch` | Only Fetch requests |
| `resource-type:xhr` | Only XHR requests |
| `larger-than:1k` | Responses over 1 KB |
| `larger-than:10k` | Responses over 10 KB |
| `domain:jsonplaceholder.typicode.com` | Requests to this domain |
| `-domain:jsonplaceholder.typicode.com` | Exclude that domain (negative filter) |
| `has-response-header:cache-control` | Has a specific response header |

Combine multiple queries with a space: `status-code:200 larger-than:1k`

---

## Network Throttling and Offline Mode

Throttling slows the browser's simulated network speed to test how the page behaves on a slow connection.

### How to Throttle

Network toolbar → throttle dropdown (default: **No throttling**) → select a profile.

| Profile | Download | Latency |
|---|---|---|
| Slow 3G | 400 KB/s | 400 ms |
| Fast 3G | 1.6 MB/s | 50 ms |
| Offline | 0 | — |

### Custom Profiles

Throttle dropdown → **Add** → set download speed (KB/s), upload speed, and latency.

### Offline Mode

Select **Offline** to cut all network access. Requests fail immediately with a network error. Use this to test:

- Service worker caching behavior.
- How the app handles total connection loss.
- Offline fallback pages.

**Important:** Always set throttle back to **No throttling** after testing.

### Demo

1. Set throttle to **Slow 3G**.
2. Click **Fetch (observe timing change)**.
3. Compare the Time column to the same request at No throttling.

---

## Request Blocking

Request blocking prevents matching requests from being sent, simulating a service being unavailable.

### Setup

1. Network panel → three-dot menu (⋮) → **Request blocking**.
2. Check **Enable request blocking**.
3. Click **+** and enter a URL pattern.
4. Trigger the request — it fails with `net::ERR_BLOCKED_BY_CLIENT`.
5. Remove the pattern or uncheck Enable when done.

### Pattern Examples

| Pattern | Blocks |
|---|---|
| `todos/5` | The specific API endpoint |
| `placeholder` | Any URL containing "placeholder" |
| `*.jpg` | All JPEG image requests |
| `api/` | Any request under the `/api/` path |

### What the App Sees

A blocked request looks like a network failure — no status code, no response body. The application's `catch` handler receives a network error. This is how you test error states without shutting down the server.

### Demo

1. Click **Fetch Blockable API** — request succeeds.
2. Enable blocking with pattern `todos/5`.
3. Click again — request fails and the output shows the caught error.

---

## Timing Analysis and TTFB

The Timing tab breaks the request into phases.

| Phase | What it measures |
|---|---|
| Queued / Stalled | Browser waiting before it could send the request (connection limit, cache check) |
| DNS Lookup | Resolving the domain to an IP address |
| Initial connection | TCP three-way handshake |
| SSL | TLS/HTTPS negotiation |
| Request sent | Time to upload the request headers and body |
| **Waiting (TTFB)** | **Time from request sent to first byte of response — reflects server processing time** |
| Content download | Time to receive the full response body |

### TTFB

TTFB (Time to First Byte) is the single most important metric for slow APIs. If TTFB is high:

- The server is slow to process the request.
- The database query may be unoptimised.
- The server is under load.
- The server is geographically far from the client.

Content download time reflects file size, not server speed.

### Demo

1. Click **Fetch (Inspect Timing)**.
2. Click the request row → Timing tab.
3. Identify which bar is the largest — on most API responses it is Waiting (TTFB).

---

## Copy as cURL

Right-click any request in the Network panel → **Copy** → **Copy as cURL (bash)**.

The output is a complete `curl` command including:
- Full URL with query parameters
- HTTP method (`-X POST`, etc.)
- All request headers (`-H "..."`)
- Request body (`--data-raw '...'`)

### When to Use

- Replay the exact request in a terminal to compare behavior outside the browser.
- Share a reproduction case with a backend engineer.
- Test the endpoint with a modified header or body.

### Demo

1. Click **Make a Request to Copy**.
2. Right-click the row → Copy → Copy as cURL (bash).
3. Paste into a terminal.

---

## Disable Cache

When DevTools is open, enable **Disable cache** to force every request to go to the network, bypassing the browser cache.

### Setup

Network toolbar → Settings gear (⚙) → check **Disable cache (while DevTools is open)**.

The setting is only active while DevTools is open. It resets when DevTools closes.

### When to Use

- Confirming a CSS or JS change is actually deployed.
- Testing resource loading time without cache benefit.
- Debugging stale-response issues.

### Demo

1. Click **Fetch Cacheable Resource** twice.
2. The second response may show "from disk cache" in the Size column (almost instant, 0 bytes transferred).
3. Enable Disable cache and click twice again — both requests now show real transferred bytes.

---

## Waterfall — Parallel vs Sequential

The waterfall column shows when each request started and how long it lasted. Overlapping bars mean parallel loading; chained bars mean sequential loading.

### Parallel Loading

All requests fire at the same time. Total time ≈ time of the slowest single request.

```javascript
// Parallel — all fire simultaneously
Promise.all([fetch('/a'), fetch('/b'), fetch('/c')]);
```

### Sequential Loading

Each request waits for the previous to finish. Total time ≈ sum of all individual times.

```javascript
// Sequential — each awaits the previous
const a = await fetch('/a');
const b = await fetch('/b');
const c = await fetch('/c');
```

### When Sequential is Intentional

Sequential loading is correct when one request depends on the result of the previous (for example, using a returned ID in the next request). When there is no dependency, always prefer parallel.

### Demo

1. Click **Load in Parallel** — note the elapsed time and observe overlapping bars in the waterfall.
2. Click **Load Sequentially** — note the significantly longer elapsed time and the chained bars.

---

## Guided Practice

### Exercise 1: Record and Preserve

1. Enable **Preserve log**.
2. Click **Make a Request**.
3. Click **Reload Page**.
4. Confirm the original request is still visible above the new page-load requests.

### Exercise 2: Read the Columns

1. Click **Fetch Post (200)** — read Name, Status, Type, Initiator, Size, Time.
2. Click **Fetch Missing (404)** — confirm the row turns red.
3. Click **Fetch Large Payload** — compare the Size column to the single post.

### Exercise 3: Inspect Detail Tabs

1. Click **Send Request with Custom Headers**. Open the request → Headers tab. Find the custom headers.
2. Click **Send POST with Body**. Open the request → Payload tab. Read the sent JSON.
3. Click **Fetch JSON (Preview)**. Open → Preview tab. Expand the JSON tree.
4. Click **Fetch (Check Timing)**. Open → Timing tab. Identify TTFB.

### Exercise 4: Filter Requests

1. Load at least one JS, CSS, image, and fetch resource using the section 5 buttons.
2. Click each type filter button and confirm the list changes.
3. Type `status-code:404` into the filter input. Run fetch404 and confirm only the 404 appears.
4. Type `larger-than:1k` and click **Fetch Large Payload** to confirm it appears.

### Exercise 5: Throttle and Compare

1. Set throttle to **Slow 3G**.
2. Click **Fetch (observe timing change)**. Note the Time value.
3. Set throttle back to **No throttling**.
4. Click again. Compare times.
5. Set to **Offline**. Click again. Confirm the request fails.

### Exercise 6: Block a Request

1. Enable request blocking with pattern `todos/5`.
2. Click **Fetch Blockable API** — confirm failure.
3. Remove the pattern and click again — confirm success.

### Exercise 7: Timing and TTFB

1. Click **Fetch (Inspect Timing)**.
2. Open the Timing tab.
3. Identify Waiting (TTFB) and Content download.
4. Click **Fetch Multiple (Waterfall)** and check if the 5 bars overlap.

### Exercise 8: Parallel vs Sequential

1. Click **Load in Parallel** — note elapsed time.
2. Click **Load Sequentially** — note elapsed time.
3. Explain to a partner why sequential is slower even though the individual requests are identical.

---

## Debugging Checklist

Use this when investigating a network-related issue:

1. Open the Network panel **before** reproducing the issue.
2. Clear the log, then trigger the action.
3. Filter by **Fetch/XHR** to focus on API calls.
4. Find the request that looks wrong — check the Status column first.
5. Open the request → **Headers** tab — check the URL, method, and status code.
6. Open **Payload** — confirm the request body is correct.
7. Open **Response** or **Preview** — read the error message from the server.
8. Open **Timing** — check if TTFB is the bottleneck.
9. If the request never appears in the list, it may be blocked or not sent at all — check Sources.
10. If CORS headers are missing, check Response Headers for `Access-Control-Allow-Origin`.

---

## Recap Questions

1. What is the difference between Preserve log and Clear?
2. What does the Initiator column tell you, and why is it useful?
3. What is the difference between the Preview and Response tabs?
4. When would you use a negative filter like `-domain:cdn.example.com`?
5. What does a high TTFB value indicate?
6. How does request blocking differ from going Offline?
7. When is sequential loading correct, and when should you prefer parallel?
8. Why do you need to disable the cache during debugging?

---

## Summary

The Network panel answers the questions: what did the browser request, what did the server return, how long did it take, and what went wrong? Understanding the request table columns, the detail tabs, filtering, and timing analysis turns network debugging from guesswork into a structured investigation.

Use this session as the foundation before moving into Coverage and Lighthouse performance auditing in Session 4.

---

## Related Docs

- [Session 2 Sources notes](../../session-02/sources/session-02-sources.md)
- [Session 1 Console notes](../../session-01/console/session-01-console.md)
- Source reference: `Chrome-DevTools-Reference/docs/04-network.md`
