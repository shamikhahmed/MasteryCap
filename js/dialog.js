const FOCUSABLE = [
  'button:not([disabled])',
  'a[href]',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/**
 * Add modal semantics, focus trap, Escape handling, inert background, and
 * opener restoration to an existing sheet root.
 */
export function mountDialog(root, { initialFocus = null } = {}) {
  if (!root || root.dataset.dialogMounted === 'true') return () => {};
  root.dataset.dialogMounted = 'true';
  const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  let dialog;
  const prepareDialog = () => {
    dialog = root.querySelector('[role="dialog"], .sheet') || root;
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    if (!dialog.hasAttribute('aria-label') && !dialog.hasAttribute('aria-labelledby')) {
      const title = dialog.querySelector('.slabel, h1, h2');
      if (title) {
        if (!title.id) title.id = `dialog-title-${crypto.getRandomValues(new Uint32Array(1))[0]}`;
        dialog.setAttribute('aria-labelledby', title.id);
      }
    }
  };
  prepareDialog();

  const backgrounds = [...document.body.children]
    .filter((element) => element !== root && !element.contains(root) && element.tagName !== 'SCRIPT')
    .map((element) => ({ element, inert: element.inert, ariaHidden: element.getAttribute('aria-hidden') }));
  backgrounds.forEach(({ element }) => {
    element.inert = true;
    element.setAttribute('aria-hidden', 'true');
  });

  const focusables = () => [...dialog.querySelectorAll(FOCUSABLE)]
    .filter((element) => !element.hidden && element.getClientRects().length > 0);
  const onKeydown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      const close = root.querySelector('[data-close], [data-skip], .sheet-x');
      if (close) close.click();
      else root.remove();
      return;
    }
    if (event.key !== 'Tab') return;
    const items = focusables();
    if (!items.length) {
      event.preventDefault();
      dialog.focus();
      return;
    }
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };
  root.addEventListener('keydown', onKeydown);

  let cleaned = false;
  const cleanup = () => {
    if (cleaned) return;
    cleaned = true;
    observer.disconnect();
    root.removeEventListener('keydown', onKeydown);
    backgrounds.forEach(({ element, inert, ariaHidden }) => {
      element.inert = inert;
      if (ariaHidden == null) element.removeAttribute('aria-hidden');
      else element.setAttribute('aria-hidden', ariaHidden);
    });
    if (opener?.isConnected) opener.focus({ preventScroll: true });
  };
  const observer = new MutationObserver(() => {
    if (!root.isConnected) cleanup();
    else prepareDialog();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  requestAnimationFrame(() => {
    const target = initialFocus ? dialog.querySelector(initialFocus) : focusables()[0];
    if (!target) {
      dialog.tabIndex = -1;
      dialog.focus({ preventScroll: true });
    } else {
      target.focus({ preventScroll: true });
    }
  });
  return cleanup;
}
