if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const register = () => {
      navigator.serviceWorker.register('sw.js?v=5231').catch(() => {});
    };
    // Defer SW install so first paint / Lighthouse is not competing with cache warm-up.
    if ('requestIdleCallback' in window) {
      requestIdleCallback(register, { timeout: 3500 });
    } else {
      setTimeout(register, 2000);
    }
  });
}
