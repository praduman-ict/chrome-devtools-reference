# Lighthouse Panel: Automated Auditing for Performance, Accessibility, and Quality

The Lighthouse panel runs automated audits of your web pages and provides actionable recommendations for improvement. It covers performance, accessibility, best practices, SEO, and PWA capabilities.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Running Audits](#running-audits)
3. [Understanding Metrics](#understanding-metrics)
4. [Performance Metrics](#performance-metrics)
5. [Accessibility Audits](#accessibility-audits)
6. [Best Practices](#best-practices)
7. [SEO Analysis](#seo-analysis)
8. [PWA Analysis](#pwa-analysis)
9. [Interpreting Reports](#interpreting-reports)
10. [Fixing Issues](#fixing-issues)

---

## Getting Started

### Opening Lighthouse
1. Press `F12` to open DevTools
2. Click **Lighthouse** tab
3. If not visible: Click (⋮) → More tools → Lighthouse

### Lighthouse Features
- Automated auditing
- Performance testing
- Accessibility checking
- Best practices validation
- SEO optimization
- PWA readiness
- Detailed recommendations

---

## Running Audits

### Audit Configuration

**Device Type:**
- **Mobile**: Mobile device (smaller viewport, network throttling)
- **Desktop**: Desktop computer (full viewport, no throttling)

**Throttle Setting:**
- **Simulated**: Simulates throttling (faster, reproducible)
- **DevTools**: Uses DevTools throttling (real throttling, slower)
- **No Throttle**: Full speed (unrealistic for mobile)

**Categories to Audit:**
- ☑ **Performance**: Speed and efficiency
- ☑ **Accessibility**: Usability for all users
- ☑ **Best Practices**: Web standards compliance
- ☑ **SEO**: Search engine optimization
- ☑ **PWA**: Progressive Web App capability

Uncheck categories to skip them (faster audits).

### Starting an Audit

**Standard Audit:**
1. Leave device/settings at defaults
2. Click **Analyze page load**
3. Wait for audit to complete (30-60 seconds)
4. Report generated

**Custom Audit:**
1. Change device type (Mobile/Desktop)
2. Select specific categories
3. Click **Analyze page load**
4. Customized report generated

### What Happens During Audit
- Lighthouse loads the page
- Records metrics and events
- Tests accessibility
- Checks best practices
- Evaluates SEO
- Checks PWA features
- Generates report

---

## Understanding Metrics

### Scoring System

**Overall Score: 0-100**
- **90-100**: Green (Good)
- **50-89**: Orange (Needs improvement)
- **0-49**: Red (Poor)

**Weighted by Category:**
- Performance: 40%
- Accessibility: 25%
- Best Practices: 20%
- SEO: 15%

### Report Organization

**Sections:**
1. **Overall Score**: 0-100 summary
2. **Metrics**: Key performance indicators
3. **Opportunities**: Fixes that improve score
4. **Diagnostics**: Issues to address
5. **Passed Audits**: Things you did right
6. **Tools & References**: Links to resources

---

## Performance Metrics

### Key Metrics

#### Largest Contentful Paint (LCP)
**What:** Time when largest visible content renders

**Target:** < 2.5 seconds (mobile/desktop)

**Measured:** From navigation start to render of largest element

**Element Types:**
- Images (including background images)
- Text blocks
- Videos
- SVGs

**Optimization:**
- Optimize images (size, format)
- Use efficient CSS
- Minimize JavaScript
- Server-side rendering
- Content Delivery Network (CDN)

#### First Input Delay (FID)
**What:** Delay before browser responds to first user interaction

**Target:** < 100ms

**Measured:** From input to JavaScript handler execution

**Causes:**
- Heavy JavaScript execution
- Main thread blocking
- Large unoptimized tasks

**Optimization:**
- Break long tasks
- Defer non-critical JavaScript
- Use Web Workers
- Minimize third-party scripts

#### Cumulative Layout Shift (CLS)
**What:** Unexpected layout changes during page load

**Target:** < 0.1

**Measured:** Sum of layout shift scores

**Causes:**
- Images without dimensions
- Ads/embeds without reserved space
- Dynamic content injection
- Web fonts loading late

**Optimization:**
- Reserve space for images (width/height)
- Pre-specify ad/embed dimensions
- Avoid dynamic content injection
- Use font-display: swap

#### First Contentful Paint (FCP)
**What:** Time when first content renders

**Target:** < 1.8 seconds

**Measured:** First text/image appearance

**Optimization:**
- Optimize critical rendering path
- Minimize render-blocking resources
- Use code splitting
- Server-side rendering

#### Speed Index
**What:** How quickly content fills the viewport

**Target:** < 3.4 seconds

**Measured:** Weighted average of content visibility times

**Optimization:**
- Optimize image loading
- Minimize JavaScript
- Use lazy loading
- Efficient CSS

#### Time to Interactive (TTI)
**What:** When page is fully interactive

**Target:** < 3.8 seconds

**Measured:** From navigation until main thread is idle

**Optimization:**
- Reduce JavaScript bundle size
- Code splitting
- Defer non-critical scripts
- Optimize CSS

### Core Web Vitals

Google's metrics for user experience:
- **LCP**: Page loads quickly
- **FID**: Page responds quickly
- **CLS**: Page is stable

Focus on these three for best results.

---

## Accessibility Audits

### What's Checked

**Color Contrast:**
- Text contrast ratio minimum 4.5:1
- Large text minimum 3:1
- Ensures readability for low vision users

**ARIA Labels:**
- Form inputs have labels
- Images have alt text
- Interactive elements properly labeled

**Heading Structure:**
- Proper h1, h2, h3 hierarchy
- No skipped levels (h1 → h3 skips h2)
- Screen reader users rely on this

**Form Labels:**
- All inputs have associated labels
- Labels connect to inputs via `for` attribute or nesting
- Screen reader users need labels

**Image Alt Text:**
- All images have descriptive alt text
- Decorative images can have empty alt
- Screen reader users need alt text

**Keyboard Navigation:**
- All interactive elements accessible by keyboard
- Tab order makes sense
- No keyboard traps

**Focus Indicators:**
- Focus visible when tabbing
- High contrast focus states
- Mobile users benefit too

### Common Fixes

**Low Contrast:**
```css
/* Bad: Unreadable */
color: #999;
background-color: #eee;

/* Good: 4.5:1 contrast */
color: #000;
background-color: #eee;
```

**Missing Alt Text:**
```html
<!-- Bad -->
<img src="photo.jpg">

<!-- Good -->
<img src="photo.jpg" alt="Team members in meeting">
```

**Unlabeled Form:**
```html
<!-- Bad -->
<input type="text">

<!-- Good -->
<label for="email">Email</label>
<input id="email" type="email">
```

---

## Best Practices

### Checklist Items

**HTTPS:**
- All content served over HTTPS
- Secure data transmission
- Required for many APIs

**Password Input Types:**
- Use `type="password"` not `type="text"`
- Browser provides password managers

**No Missing Charset:**
- `<meta charset="UTF-8">` in head
- Ensures proper text encoding

**Responsive Viewport:**
- `<meta name="viewport">`
- Essential for mobile
- DevTools checks this

**No Plugin Deprecation:**
- No Flash, Java applets
- Standards-based approach

**No Insecure Third-Party Resources:**
- Third-party resources over HTTPS
- No mixed content warnings

**No Front-End Performance Issues:**
- Uses efficient logging
- Avoids deprecated APIs
- Optimization opportunities identified

---

## SEO Analysis

### What's Checked

**Meta Tags:**
- Page has title
- Meta description present
- Open Graph tags (social sharing)

**Structured Data:**
- Schema.org markup
- JSON-LD format
- Helps search engines understand content

**Mobile Friendly:**
- Responsive design
- Proper viewport
- Readable text sizes

**Links:**
- All links have descriptive text
- No links with just "click here"
- Helps SEO and accessibility

**Language:**
- HTML has `lang` attribute
- Tells search engines page language

### SEO Optimization

**Title Tag:**
```html
<!-- Bad -->
<title>Page</title>

<!-- Good -->
<title>How to Debug JavaScript with Chrome DevTools</title>
```

**Meta Description:**
```html
<!-- Shows in search results -->
<meta name="description" content="Complete guide to Chrome DevTools debugging features for JavaScript developers.">
```

**Structured Data:**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "My Article Title",
  "description": "Article description"
}
```

---

## PWA Analysis

### What's Checked

**Web App Manifest:**
- manifest.json file
- App name, icons, theme colors
- Makes installable PWA

**HTTPS:**
- Required for PWA
- Secure installation

**Service Worker:**
- Offline capability
- Background sync
- Push notifications

**Example Manifest:**
```json
{
  "name": "My App",
  "short_name": "App",
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192"
    }
  ],
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#3367D6"
}
```

---

## Interpreting Reports

### Report Sections

**Metrics:**
- Visual summary of key metrics
- Green (good), orange (needs work), red (poor)
- Click metric for explanation

**Opportunities:**
- Issues that improve your score
- Estimated impact on metrics
- Detailed recommendations
- Code examples for fixes

**Diagnostics:**
- Additional information
- Not scored but helpful
- Performance insights
- Best practice checks

**Passed Audits:**
- Things you're doing right
- Celebrate these!
- Shows understanding of best practices

### Comparing Audits

**Run Multiple Times:**
1. Run audit, note scores
2. Make optimizations
3. Run audit again
4. Compare improvements

**Before/After:**
```
Initial audit:
- Performance: 45
- Accessibility: 72
- Best Practices: 65

After optimizations:
- Performance: 78 (+33)
- Accessibility: 92 (+20)
- Best Practices: 85 (+20)
```

---

## Fixing Issues

### Priority Order

1. **Red (Poor) Issues**: Critical, address first
2. **Orange (Medium) Issues**: Important, address next
3. **Green/Passed**: Good, no action needed

### Common Fixes

**Performance:**
- Optimize images
- Remove unused code
- Lazy load off-screen content
- Minify CSS/JS
- Use CDN

**Accessibility:**
- Add missing alt text
- Fix color contrast
- Add form labels
- Improve focus indicators
- Use semantic HTML

**Best Practices:**
- Enable HTTPS
- Use password input type
- Update deprecated APIs
- Remove tracking issues

**SEO:**
- Add descriptive titles
- Add meta descriptions
- Make site mobile-friendly
- Use proper heading hierarchy

### Iteration

1. **Audit page**
2. **Identify top issues**
3. **Make improvements**
4. **Test changes locally**
5. **Re-audit**
6. **Repeat**

---

## Advanced Usage

### Monitor Over Time
Track score history:
1. Run audit periodically (daily, weekly)
2. Record scores
3. Watch for regressions
4. Celebrate improvements

### CI/CD Integration
Automate Lighthouse:
1. Lighthouse CI tool
2. Run on every deploy
3. Fail build if score drops
4. Enforce quality standards

### Mobile vs. Desktop
Run both:
1. Mobile audit (most users)
2. Desktop audit
3. Compare results
4. Optimize for both

---

## Summary

Lighthouse is essential for:
- **Auditing** overall web quality
- **Measuring** performance metrics
- **Checking** accessibility
- **Validating** SEO
- **Verifying** best practices
- **Monitoring** PWA readiness

Master Lighthouse to continuously improve your web application quality.

---

## References
- [web.dev](https://web.dev) - Official Lighthouse guidance
- [Chrome DevTools Docs](https://developer.chrome.com/docs/devtools/lighthouse/)
- [Core Web Vitals](https://web.dev/vitals/)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## Related Docs
- [Network Panel - Performance Analysis](04-network.md)
- [Coverage Panel - Code Optimization](05-coverage.md)
