/**
 * Accessible dialogs — replaces native browser dialogs (MST-P1-03).
 */

function ensureStyles() {
  if (document.getElementById('mc-dialog-css')) return;
  const style = document.createElement('style');
  style.id = 'mc-dialog-css';
  style.textContent = `
.mc-dialog-backdrop{position:fixed;inset:0;background:rgba(10,10,12,.48);z-index:200;display:flex;align-items:flex-end;justify-content:center;padding:max(12px,env(safe-area-inset-bottom))}
@media(min-width:560px){.mc-dialog-backdrop{align-items:center}}
.mc-dialog{width:min(100%,420px);background:var(--surface-2);color:var(--t0);border:1px solid var(--line-2,rgba(255,255,255,.12));border-radius:16px 16px 12px 12px;padding:18px 16px 14px;box-shadow:0 18px 48px rgba(0,0,0,.35)}
.mc-dialog h2{margin:0 0 8px;font:600 1.125rem/1.25 var(--font-ui,system-ui);color:var(--t0)}
.mc-dialog p{margin:0;font-size:.9375rem;line-height:1.45;color:var(--t2)}
.mc-dialog__actions{display:flex;gap:8px;justify-content:flex-end;margin-top:16px;flex-wrap:wrap}
.mc-dialog__actions .btn{min-height:44px;padding:0 14px}
.mc-dialog input{width:100%;margin-top:12px;min-height:44px;border-radius:10px;border:1px solid var(--line);background:var(--surface-3);color:var(--t0);padding:0 12px;font-size:1rem}
`;
  document.head.appendChild(style);
}

function mountDialog({ title, body, input, confirmLabel, cancelLabel, destructive, showCancel }) {
  ensureStyles();
  return new Promise((resolve) => {
    const backdrop = document.createElement('div');
    backdrop.className = 'mc-dialog-backdrop';
    backdrop.setAttribute('role', 'presentation');
    const dialog = document.createElement('div');
    dialog.className = 'mc-dialog';
    dialog.setAttribute('role', 'alertdialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('aria-labelledby', 'mc-dlg-title');
    const h = document.createElement('h2');
    h.id = 'mc-dlg-title';
    h.tabIndex = -1;
    h.textContent = title || '';
    dialog.appendChild(h);
    if (body) {
      const p = document.createElement('p');
      p.textContent = body;
      dialog.appendChild(p);
    }
    let inputEl = null;
    if (input) {
      inputEl = document.createElement('input');
      inputEl.type = 'text';
      inputEl.autocomplete = 'off';
      inputEl.placeholder = input.placeholder || '';
      dialog.appendChild(inputEl);
    }
    const actions = document.createElement('div');
    actions.className = 'mc-dialog__actions';
    const close = (val) => {
      backdrop.remove();
      window.removeEventListener('keydown', onKey);
      resolve(val);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') close(input ? null : false);
      if (e.key === 'Enter' && inputEl && document.activeElement === inputEl) {
        e.preventDefault();
        close(inputEl.value);
      }
    };
    if (showCancel !== false) {
      const cancel = document.createElement('button');
      cancel.type = 'button';
      cancel.className = 'btn ghost';
      cancel.textContent = cancelLabel || 'Cancel';
      cancel.addEventListener('click', () => close(input ? null : false));
      actions.appendChild(cancel);
    }
    const confirm = document.createElement('button');
    confirm.type = 'button';
    confirm.className = `btn ${destructive ? 'ghost' : 'accent'}`;
    if (destructive) confirm.style.color = 'var(--down)';
    confirm.textContent = confirmLabel || 'OK';
    confirm.addEventListener('click', () => close(input ? inputEl.value : true));
    actions.appendChild(confirm);
    dialog.appendChild(actions);
    backdrop.appendChild(dialog);
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) close(input ? null : false);
    });
    document.body.appendChild(backdrop);
    window.addEventListener('keydown', onKey);
    (inputEl || h).focus();
  });
}

export function CapConfirm({ title, body = '', confirmLabel = 'Confirm', cancelLabel = 'Cancel', destructive = false } = {}) {
  return mountDialog({ title, body, confirmLabel, cancelLabel, destructive, showCancel: true });
}

export function CapAlert({ title, body = '', confirmLabel = 'OK' } = {}) {
  return mountDialog({ title, body, confirmLabel, showCancel: false });
}

export function CapPrompt({ title, body = '', confirmLabel = 'OK', cancelLabel = 'Cancel', placeholder = '' } = {}) {
  return mountDialog({
    title,
    body,
    input: { placeholder },
    confirmLabel,
    cancelLabel,
    showCancel: true,
  });
}
