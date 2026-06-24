# Session 03: Network Panel and API Debugging

This session focuses on understanding how the browser loads resources and communicates with APIs, using the Chrome DevTools Network panel.

- **Network**: record all requests, inspect headers and payloads, filter by type or status, simulate slow connections, block requests, and analyse timing to find bottlenecks.
- **Debugging workflow**: identify the failing request, read the status and response, check the payload, inspect timing, block to test error states, and replay with cURL.

Use the detailed notes and demo file inside the `network` folder for hands-on practice.

## Open DevTools

| Method | Windows/Linux | macOS |
|---|---|---|
| Open DevTools | `F12` or `Ctrl+Shift+I` | `Cmd+Option+I` |
| Open Network directly | `Ctrl+Shift+I` → Network tab | `Cmd+Option+I` → Network tab |
| Clear Network log | `Ctrl+L` | `Cmd+K` |
| Search in requests | `Ctrl+F` | `Cmd+F` |

## Session Files

### Network

Record and inspect every request, filter by type or status, simulate throttling, block requests, analyse request timing, copy requests as cURL commands, and understand parallel vs sequential loading.

- [Network notes](network/session-03-network.md)
- [Network workshop demo](network/network-workshop.html)

## Topic Coverage

| Topic | Demo Section | Practice Area |
|---|---|---|
| Recording, Preserve log, Clear | Section 1 | Enable Preserve log, reload, confirm rows stay |
| Request table columns | Section 2 | Read Name, Status, Type, Initiator, Size, Time |
| Headers tab | Section 3.1 | Find custom request headers and response headers |
| Payload tab | Section 3.2 | Inspect the JSON body of a POST request |
| Preview tab | Section 3.3 | Expand a JSON response tree |
| Response tab | Section 3.4 | Read raw response body |
| Timing tab | Section 3.5 | Identify TTFB vs content download |
| XHR vs Fetch | Section 4 | Compare Type column for both request types |
| Type filter buttons | Section 5 | Filter by JS, CSS, Img, Fetch/XHR |
| Advanced filter queries | Section 6 | Use `status-code:404`, `larger-than:1k`, `domain:` |
| Network throttling | Section 7 | Compare request timing at Slow 3G vs No throttling |
| Offline mode | Section 7 | Confirm requests fail when set to Offline |
| Request blocking | Section 8 | Block by URL pattern and observe app error handling |
| Timing analysis and TTFB | Section 9 | Read each timing phase, identify the bottleneck |
| Copy as cURL | Section 10 | Export a request and replay in a terminal |
| Disable cache | Section 11 | Compare cached vs uncached response size |
| Waterfall | Section 12 | Compare parallel vs sequential total load time |

## Suggested Time Split

- 5 minutes: Recap JavaScript debugging (Session 2) and connect it to API behavior.
- 15 minutes: Explain the request table, detail tabs, and filtering.
- 30 minutes: Live demo and guided practice using `network/network-workshop.html`.
- 10 minutes: Q&A, recap, and network investigation task.

## Quick Practice

1. Open `network/network-workshop.html` in Chrome.
2. Open DevTools with `F12` and go to the **Network** tab.
3. Click **Make a Request** (section 1) and observe the row that appears.
4. Enable **Preserve log**, click **Reload Page**, and confirm previous requests remain visible.
5. Click **Fetch Post (200)** and **Fetch Missing (404)** — compare Status colours.
6. Click **Send Request with Custom Headers** and inspect the Headers tab.
7. Click **Send POST with Body** and inspect the Payload tab.
8. Click **Make Fetch Request** and **Make XHR Request** — filter by Fetch/XHR and compare Type.
9. Type `status-code:404` in the filter input after triggering a 404.
10. Set throttle to **Slow 3G**, click **Fetch (observe timing change)**, then reset to No throttling.
11. Enable request blocking with pattern `todos/5` and click **Fetch Blockable API**.
12. Click **Load in Parallel** then **Load Sequentially** — compare elapsed times and waterfall shape.

## References

- Official Chrome DevTools Network panel overview: https://developer.chrome.com/docs/devtools/network
- Network features reference: https://developer.chrome.com/docs/devtools/network/reference
- Inspect network activity: https://developer.chrome.com/docs/devtools/network/inspect-network-activity
- Simulate network conditions: https://developer.chrome.com/docs/devtools/network/reference#throttling
