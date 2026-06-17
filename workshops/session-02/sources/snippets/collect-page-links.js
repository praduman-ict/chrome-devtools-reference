// Snippet: collect-page-links
// Collects all unique href links from <a> tags on the current page,
// logs them to the Console, and copies them to clipboard (one per line).
// Useful for auditing navigation, finding broken links, or scraping URLs.

const pageLinks = [...new Set(
    [...document.querySelectorAll('a[href]')]
        .map(anchor => anchor.href)
        .filter(href => href.startsWith('http'))
)];

console.log(pageLinks.join('\n'));
copy(pageLinks.join('\n'));
// navigator.clipboard.writeText(pageLinks.join('\n'));
