// @ts-check
/** Shared device matrix for MasteryCap visual QA */

/** @typedef {{ id: string, label: string, width: number, height: number, chrome: string, safeTop: number, safeBottom: number, family: 'iphone'|'ipad'|'browser' }} DeviceDef */

/** Shell: bottom tabs always. ≥900px = desktop-tabs (wider --maxw). No sidebar. */
const DESKTOP_BP = 900;

/** @type {DeviceDef[]} */
const IPHONE = [
  { id: 'iphone-se', label: 'iPhone SE (home button)', width: 375, height: 667, chrome: 'home-button', safeTop: 20, safeBottom: 0, family: 'iphone' },
  { id: 'iphone-13-mini', label: 'iPhone 13 mini (notch)', width: 375, height: 812, chrome: 'notch', safeTop: 50, safeBottom: 34, family: 'iphone' },
  { id: 'iphone-14', label: 'iPhone 14 (notch)', width: 390, height: 844, chrome: 'notch', safeTop: 47, safeBottom: 34, family: 'iphone' },
  { id: 'iphone-14-pro', label: 'iPhone 14/15 Pro (Dynamic Island)', width: 393, height: 852, chrome: 'dynamic-island', safeTop: 59, safeBottom: 34, family: 'iphone' },
  { id: 'iphone-15-pro-max', label: 'iPhone 15 Pro Max (Dynamic Island)', width: 430, height: 932, chrome: 'dynamic-island', safeTop: 59, safeBottom: 34, family: 'iphone' },
  { id: 'iphone-16-pro-max', label: 'iPhone 16 Pro Max (Dynamic Island)', width: 440, height: 956, chrome: 'dynamic-island', safeTop: 62, safeBottom: 34, family: 'iphone' },
];

/** @type {DeviceDef[]} */
const IPAD = [
  { id: 'ipad-mini', label: 'iPad mini', width: 744, height: 1133, chrome: 'tablet', safeTop: 24, safeBottom: 20, family: 'ipad' },
  { id: 'ipad-air-11', label: 'iPad Air 11"', width: 820, height: 1180, chrome: 'tablet', safeTop: 24, safeBottom: 20, family: 'ipad' },
  { id: 'ipad-pro-11', label: 'iPad Pro 11"', width: 834, height: 1194, chrome: 'tablet', safeTop: 24, safeBottom: 20, family: 'ipad' },
  { id: 'ipad-pro-13', label: 'iPad Pro 13" portrait', width: 1024, height: 1366, chrome: 'tablet', safeTop: 24, safeBottom: 20, family: 'ipad' },
  { id: 'ipad-pro-13-land', label: 'iPad Pro 13" landscape', width: 1366, height: 1024, chrome: 'tablet', safeTop: 24, safeBottom: 20, family: 'ipad' },
];

/** @type {DeviceDef[]} */
const BROWSER = [
  { id: 'browser-phone-360', label: 'Mobile browser 360', width: 360, height: 740, chrome: 'browser', safeTop: 0, safeBottom: 0, family: 'browser' },
  { id: 'browser-sm-laptop', label: 'Laptop 1280×800', width: 1280, height: 800, chrome: 'browser', safeTop: 0, safeBottom: 0, family: 'browser' },
  { id: 'browser-hd', label: 'Desktop 1440×900', width: 1440, height: 900, chrome: 'browser', safeTop: 0, safeBottom: 0, family: 'browser' },
  { id: 'browser-fhd', label: 'Desktop 1920×1080', width: 1920, height: 1080, chrome: 'browser', safeTop: 0, safeBottom: 0, family: 'browser' },
  { id: 'browser-ultrawide', label: 'Ultrawide 2560×1080', width: 2560, height: 1080, chrome: 'browser', safeTop: 0, safeBottom: 0, family: 'browser' },
];

/** @type {DeviceDef[]} */
const ALL_DEVICES = [...IPHONE, ...IPAD, ...BROWSER];

/** Major MasteryCap screens */
const MAJOR_SCREENS = [
  { id: 'admission', label: 'Admission / gate', kind: 'admission' },
  { id: 'today', label: 'Today (dashboard)', kind: 'tab', tab: 'today' },
  { id: 'campus', label: 'Campus (primary list)', kind: 'tab', tab: 'campus' },
  { id: 'practice', label: 'Practice (secondary hub)', kind: 'tab', tab: 'practice' },
  { id: 'records', label: 'Records', kind: 'tab', tab: 'records' },
  { id: 'settings', label: 'Settings sheet', kind: 'overlay' },
];

/**
 * @param {import('@playwright/test').Page} page
 * @param {DeviceDef} device
 */
async function applyDeviceChrome(page, device) {
  await page.setViewportSize({ width: device.width, height: device.height });
  await page.evaluate(({ safeTop, safeBottom, chrome, navH }) => {
    const root = document.documentElement;
    root.style.setProperty('--st', `${safeTop}px`);
    root.style.setProperty('--sb', `${safeBottom}px`);
    root.dataset.qaChrome = chrome;
    root.dataset.qaSafeTop = String(safeTop);
    root.dataset.qaSafeBottom = String(safeBottom);

    let tag = document.getElementById('qa-device-safe');
    if (!tag) {
      tag = document.createElement('style');
      tag.id = 'qa-device-safe';
      document.head.appendChild(tag);
    }
    tag.textContent = `
      :root {
        --st: ${safeTop}px !important;
        --sb: ${safeBottom}px !important;
      }
      .tabbar {
        padding-bottom: ${safeBottom}px !important;
      }
      .screen, .inst-screen, .homeboard, .onb {
        padding-top: calc(${safeTop}px + 12px) !important;
        padding-bottom: calc(${navH}px + ${safeBottom}px + 44px) !important;
      }
      #splash {
        padding-top: ${safeTop}px !important;
        padding-bottom: ${safeBottom}px !important;
        box-sizing: border-box;
      }
      .sw-toast {
        bottom: calc(${navH}px + ${safeBottom}px + 14px) !important;
      }
      .sheet {
        padding-bottom: calc(18px + ${safeBottom}px) !important;
      }
      .settings-body {
        padding-bottom: calc(18px + ${safeBottom}px) !important;
      }
    `;
  }, {
    safeTop: device.safeTop,
    safeBottom: device.safeBottom,
    chrome: device.chrome,
    navH: 58,
  });
  await page.waitForTimeout(80);
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {number} width
 */
function expectedLayout(width) {
  return width >= DESKTOP_BP ? 'desktop-tabs' : 'mobile-tabs';
}

/**
 * @param {import('@playwright/test').Page} page
 */
async function probeLayout(page) {
  return page.evaluate((bp) => {
    const tabs = document.querySelector('#tabbar, .tabbar');
    const sidebar = document.querySelector('#sidebar, .sidebar');
    const tabsVisible = !!(tabs && !tabs.classList.contains('hidden')
      && getComputedStyle(tabs).display !== 'none'
      && tabs.getBoundingClientRect().height > 0);
    const sideVisible = !!(sidebar && getComputedStyle(sidebar).display !== 'none'
      && sidebar.getBoundingClientRect().width > 0);
    const overflow = document.documentElement.scrollWidth > document.documentElement.clientWidth + 2;
    const tabRect = tabsVisible ? tabs.getBoundingClientRect() : null;
    const tabHit = tabsVisible
      ? [...tabs.querySelectorAll('.tab')].map((el) => {
        const label = el.querySelector('.tab-label');
        const r = el.getBoundingClientRect();
        return {
          text: (label?.textContent || el.textContent || '').trim().slice(0, 24),
          w: Math.round(r.width),
          h: Math.round(r.height),
          truncated: !!(label && label.scrollWidth > label.clientWidth + 1),
        };
      })
      : [];
    const tabLabels = tabHit;
    const toast = document.querySelector('.sw-toast.on, .sw-toast');
    const toastRect = toast && toast.classList.contains('on') ? toast.getBoundingClientRect() : null;
    const sheet = document.querySelector('.sheet-root.on .sheet');
    const sheetRect = sheet ? sheet.getBoundingClientRect() : null;
    const h1 = document.querySelector('h1, .splash-wordmark, .onb-title');
    const h1Top = h1 ? h1.getBoundingClientRect().top : null;
    const verEl = document.querySelector('.set-version, #settings-sheet .mono');
    const versionText = verEl ? verEl.textContent?.trim() : null;
    const maxw = getComputedStyle(document.documentElement).getPropertyValue('--maxw').trim();

    let layout = 'unknown';
    if (tabsVisible && !sideVisible) {
      layout = window.innerWidth >= bp ? 'desktop-tabs' : 'mobile-tabs';
    } else if (sideVisible && !tabsVisible) layout = 'sidebar';
    else if (sideVisible && tabsVisible) layout = 'hybrid-both';
    else layout = 'neither';

    return {
      layout,
      tabsVisible,
      sideVisible,
      overflow,
      tabBottom: tabRect ? Math.round(tabRect.bottom) : null,
      tabHeight: tabRect ? Math.round(tabRect.height) : null,
      viewportH: window.innerHeight,
      viewportW: window.innerWidth,
      tabLabels,
      toastBottom: toastRect ? Math.round(toastRect.bottom) : null,
      sheetBottom: sheetRect ? Math.round(sheetRect.bottom) : null,
      h1Top: h1Top != null ? Math.round(h1Top) : null,
      versionText,
      maxw,
      safeTopUsed: getComputedStyle(document.documentElement).getPropertyValue('--st').trim(),
      safeBottomUsed: getComputedStyle(document.documentElement).getPropertyValue('--sb').trim(),
    };
  }, DESKTOP_BP);
}

module.exports = {
  DESKTOP_BP,
  IPHONE,
  IPAD,
  BROWSER,
  ALL_DEVICES,
  MAJOR_SCREENS,
  applyDeviceChrome,
  probeLayout,
  expectedLayout,
};
