// Snippet: collect-image-urls
// Collects all image URLs from <img> tags on the current page,
// logs them as a space-separated list, and copies to clipboard.
// Paste the clipboard output directly into a wget command:
//   wget -P ./images <paste here>

const imageUrls = [...document.querySelectorAll('img[src]')]
    .map(img => img.src)
    .filter(src => !src.startsWith('data:'));

console.log(imageUrls.join(' '));
copy(imageUrls.join(' '));
// navigator.clipboard.writeText(imageUrls.join(' '));
