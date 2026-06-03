# Network Panel: Monitoring and Analyzing Network Requests

The Network panel monitors all network activity including HTTP requests, responses, and WebSocket connections. It's essential for understanding resource loading, debugging network issues, and optimizing performance.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Recording Network Activity](#recording-network-activity)
3. [Request Details](#request-details)
4. [Filtering Requests](#filtering-requests)
5. [Network Throttling](#network-throttling)
6. [Request Blocking](#request-blocking)
7. [Analysis and Optimization](#analysis-and-optimization)
8. [Advanced Features](#advanced-features)

---

## Getting Started

### Opening the Network Panel
- Press `Ctrl+Shift+I` and click **Network** tab
- Or press `F12` and click Network

### Recording State
A blue dot near the top-left indicates if recording is active:
- **Blue dot**: Recording (capturing requests)
- **No dot**: Not recording (requests ignored)

Click recording button to start/stop.

---

## Recording Network Activity

### How Recording Works
1. Open Network panel
2. Recording starts automatically
3. Interact with page (click, navigate, submit forms)
4. All requests appear in the request list
5. Click request to see details

### Clearing Requests
- **Clear button** (trash icon) removes all requests from list
- Clearing doesn't stop recording
- New requests appear as you interact

### Preserve Log
**Preserve log on navigation:**
1. Check "Preserve log" checkbox
2. Requests persist when page loads/refreshes
3. Useful for debugging page navigation

---

## Request Details

### Request List View
Main table showing all requests:

| Column | Meaning |
|--------|---------|
| Name | Filename/URL of resource |
| Status | HTTP status (200, 404, 500, etc.) |
| Type | Resource type (document, script, stylesheet, fetch, etc.) |
| Initiator | What triggered the request |
| Size | Response size (from cache or network) |
| Time | How long request took |

**Status Code Colors:**
- **Green (200-299)**: Successful
- **Orange (300-399)**: Redirection
- **Red (400-499)**: Client error
- **Red (500+)**: Server error

### Clicking a Request

Click any request row to expand details panel showing:
- **Headers**: Request and response headers
- **Preview**: Rendered response (HTML, images, etc.)
- **Response**: Raw response body
- **Timing**: Detailed request timeline

### Headers Tab

**Request Headers:**
- HTTP method (GET, POST, etc.)
- Request URL
- HTTP version
- Custom headers

**Response Headers:**
- HTTP status code
- Server name
- Content type
- Cache headers
- Cookies set

**Query String Parameters:**
- URL parameters from query string
- Useful for debugging API calls

**Form Data:**
- POST body parameters (for form submissions)
- JSON data
- Headers sent

### Preview Tab

Shows rendered response:
- **HTML**: Formatted HTML preview
- **Images**: Image preview
- **JSON**: Formatted JSON
- **Text**: Raw text

### Response Tab

Raw response body - the actual data sent by server.

**Use Cases:**
- Verify API response data
- Debug JSON format issues
- Check HTML content

### Timing Tab

Detailed breakdown of request timing:

```
Stalled:          ████ 100ms  (Browser processing)
DNS:              █ 10ms      (Domain lookup)
Initial connection: ██ 50ms   (TCP connection)
SSL:              ███ 150ms   (HTTPS handshake)
Request sent:     ██ 10ms     (Sending request)
Waiting (TTFB):   ███████ 500ms (Server processing)
Content download: █ 50ms      (Downloading response)
```

**TTFB** (Time to First Byte): Time from request sent until first response received.

---

## Filtering Requests

### Filter Input
Type in filter field to search requests:
- Filter by filename
- Filter by domain
- Filter by properties

### Filter Types (Buttons)
Click buttons to show only certain types:

| Type | Requests |
|------|----------|
| **XHR** | Fetch/XMLHttpRequest API calls |
| **JS** | JavaScript files |
| **CSS** | Stylesheets |
| **Img** | Images |
| **Media** | Audio/video |
| **Font** | Web fonts |
| **Doc** | HTML documents |
| **WS** | WebSockets |
| **Manifest** | Web app manifests |
| **Other** | Other resources |

**Multi-select:**
- Click multiple type buttons
- Shows all matching types

### Filter by Property
Advanced filtering:

```
status-code:404          # Show 404 errors only
type:xhr                 # Show XHR requests
domain:api.example.com   # Show requests to specific domain
has-response-header:x-custom  # Has specific header
larger-than:1k           # Larger than 1 KB
```

### Negative Filter
Exclude requests:
```
-type:img                # Hide images
-domain:cdn.example.com  # Hide CDN requests
```

---

## Network Throttling

Simulate slower network conditions:

### Throttle Dropdown
1. Network panel → Throttle dropdown (top-left)
2. Select network profile:
   - **No throttling**: Full speed
   - **Slow 3G**: Simulates slow 3G network
   - **Fast 3G**: Typical 3G speed
   - **Offline**: No network (page loads from cache)

### What Throttling Simulates
- **Bandwidth**: Limits download speed
- **Latency**: Adds delay to requests
- **Packet loss**: Simulates network unreliability

### Custom Throttling
Create custom throttle profiles:

1. Throttle dropdown → Custom
2. Set:
   - Download speed (KB/s)
   - Upload speed (KB/s)
   - Latency (ms)
3. Apply

**Typical Profiles:**
```
Slow 3G:     400 KB/s download, 400 KB/s upload, 400ms latency
Fast 3G:     1.6 MB/s download, 750 KB/s upload, 50ms latency
Slow 4G:     4 MB/s download, 3 MB/s upload, 20ms latency
Cable:       5 MB/s download, 1 MB/s upload, 2ms latency
WiFi:        30 MB/s download, 15 MB/s upload, 2ms latency
```

### Use Cases
- Test on slow networks (common on mobile)
- Ensure app works under poor conditions
- Identify performance bottlenecks
- Test timeout handling

---

## Request Blocking

Block specific requests from loading.

### Why Block Requests?
- Test behavior when service unavailable
- Simulate missing resources
- Test error handling
- Improve performance testing

### Setting Up Request Blocking

**Enable Request Blocking:**
1. Network panel → Click three dots (⋮)
2. Enable "Request blocking"
3. Request Blocking tab appears on right

**Add Block Pattern:**
1. Request Blocking tab
2. Click "+" button
3. Enter URL pattern to block
4. Press Enter

**Pattern Examples:**
```
/api/users       # Block requests to /api/users
*.json           # Block all .json files
ads.example.com  # Block entire domain
/assets/images/  # Block image folder
```

### Blocking in Action

Once pattern added:
1. Requests matching pattern are blocked
2. Network request never sent
3. Browser receives network error
4. Application must handle the error

**What Application Sees:**
- Network error (similar to no internet)
- 0 bytes transferred
- Request fails

### Remove Block Pattern
1. Request Blocking tab
2. Find pattern to remove
3. Click "X" button next to pattern

### Use Cases

**Test Missing API:**
```
Block: /api/data
Result: Application shows error state
```

**Test Image Failures:**
```
Block: *.jpg
Result: Images don't load, layout test without images
```

**Test Offline:**
```
Block: *
Result: Simulate completely offline mode
```

---

## Analysis and Optimization

### Understanding Request Waterfall
The waterfall shows request timing:

```
request1.js ────────────────────────────► 
  (blocks rendering, large file)

request2.js                  ──────────►
  (smaller, second request)

request3.js                            ────►
  (small, fast, third)
```

**Optimization Goals:**
- Reduce total time
- Parallelize requests
- Reduce file sizes
- Eliminate unnecessary requests

### Identifying Problems

**Slow Requests:**
- Wide bars indicate slow transfer
- Check latency (Stalled + Waiting)
- May indicate server issues

**Cascading Requests:**
- One request blocks others
- Sequential loading inefficient
- Should parallel-load if possible

**Large Files:**
- Look for oversized resources
- Consider compression (gzip)
- Minify code
- Optimize images

### Content-Length and Gzip

**Transferred vs. Resource Size:**
- Network shows transferred size (with compression)
- Uncompressed size usually larger
- Gzip reduces transfer by 60-80%

### Cache Usage

**From Disk Cache:**
- "from disk cache" = loaded from browser cache
- Very fast, doesn't hit network
- Good for static assets

**From Memory Cache:**
- "from memory cache" = loaded from RAM
- Fastest possible
- Session-based

**Network Request:**
- Size shown = actual network transfer
- Includes compression

---

## Advanced Features

### Disable Browser Cache
Option to disable caching during debugging:

1. Network panel → Settings (gear icon)
2. Check "Disable cache (while DevTools is open)"

Use when:
- Testing caching behavior
- Ensuring fresh resources
- Debugging cache issues

### Copy Request as cURL
Export request as cURL command:

1. Right-click request
2. Select **Copy** → **Copy as cURL**
3. Paste in terminal to replay request

**Use Cases:**
- Debug requests outside browser
- Share reproduction steps
- Test with different tools

### View Cookies
See cookies sent/set by requests:

1. Click request → Headers tab
2. Scroll down to see:
   - Cookies sent with request
   - Set-Cookie responses
   - Cookie details

### Timing Analysis
Detailed timing for performance:

1. Click request → Timing tab
2. See:
   - Stalled time
   - DNS lookup time
   - Connection time
   - TTFB (important metric)
   - Content download time

**Optimization Focus:**
- TTFB indicates server performance
- Content download indicates file size
- Connection time indicates server location/distance

### Priority Analysis
See resource loading priority:

1. Network panel settings → Color code by protocol
2. Colors show:
   - High priority (red/orange): Critical resources
   - Medium priority (blue): Important resources
   - Low priority (gray): Deferred loading

---

## Common Debugging Scenarios

### API Not Returning Data
1. Network panel → Filter for "XHR"
2. Find your API request
3. Click request → Response tab
4. Check response body
5. Headers tab for status code
6. Look for error messages

### Page Loading Slowly
1. Check waterfall for cascading requests
2. Look for oversized resources
3. Use throttling to simulate slow network
4. Identify critical bottlenecks

### Images Not Loading
1. Filter for image type
2. Check status codes (should be 200)
3. Preview tab to see if image displays
4. Response tab for error messages

### CORS Errors
1. Network panel → Find failing request
2. Headers tab → Response headers
3. Look for Access-Control-Allow-Origin
4. Check preflight requests (OPTIONS method)

---

## Summary

The Network panel is essential for:
- **Monitoring** all network activity
- **Debugging** request/response issues
- **Optimizing** loading performance
- **Testing** different network conditions
- **Blocking** requests for error scenarios
- **Understanding** resource dependencies

Master the Network panel to optimize loading performance and debug network-related issues.

---

## Related Docs
- [Lighthouse Panel - Performance Audits](06-lighthouse.md)
- [Coverage Panel - Code Analysis](05-coverage.md)
