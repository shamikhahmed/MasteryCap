if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      await navigator.serviceWorker.register('sw.js?v=5220');
    } catch (_) {}
  });
}
