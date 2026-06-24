// Lighthouse Workshop — supporting JS for interactive sections

function logConsoleError() {
    // Intentionally logs an error so the re-run audit can detect it under Best Practices
    console.error('Workshop demo error: intentionally logged to test Lighthouse Best Practices check.');
    document.getElementById('best-practices-output').textContent =
        'Error logged to Console. Re-run the Lighthouse audit and check Best Practices → ' +
        '"Browser errors were logged to the console."';
}

function showPassedAuditTip() {
    document.getElementById('passed-output').textContent =
        'After making a fix (e.g. adding the meta description), re-run the audit.\n' +
        'The item moves from the flagged list into Passed Audits — confirming the fix worked.\n' +
        'This is the core iteration loop: audit → fix → re-audit → confirm.';
}
