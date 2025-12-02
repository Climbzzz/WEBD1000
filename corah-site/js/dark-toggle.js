// Shared dark mode toggle script for CORAH pages
(function () {
  const btn = document.getElementById('dark-toggle');
  if (!btn) return;
  const darkClass = 'dark';
  function apply(isDark) {
    document.documentElement.classList.toggle(darkClass, !!isDark);
    btn.textContent = isDark ? '☀️' : '🌙';
    btn.setAttribute('aria-pressed', String(!!isDark));
    // Swap brand wordmark if present
    try {
      const wordmark = document.getElementById('brand-wordmark') || document.querySelector('.brand-wordmark');
      if (wordmark) {
        const darkSrc = wordmark.dataset.darkSrc || 'images/corah-brand-wordmark-dark.svg';
        const original = wordmark.dataset.originalSrc || wordmark.getAttribute('data-original-src');
        // store original src on first run
        if (!wordmark.dataset.originalSrc) {
          wordmark.dataset.originalSrc = wordmark.src || wordmark.getAttribute('src');
        }
        wordmark.src = isDark ? darkSrc : wordmark.dataset.originalSrc;
      }
    } catch (e) {
      // silently ignore if DOM not ready or any error
    }
  }
  const stored = localStorage.getItem('corah-dark');
  const prefers = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = stored !== null ? stored === '1' : prefers;
  apply(initial);
  btn.addEventListener('click', function () {
    const isDark = !document.documentElement.classList.contains(darkClass);
    apply(isDark);
    localStorage.setItem('corah-dark', isDark ? '1' : '0');
  });
})();
