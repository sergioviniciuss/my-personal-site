export type Consent = 'granted' | 'denied';

declare global {
  interface Window { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void }
}

const CONSENT_KEY = 'analytics-consent';
const OPT_OUT_KEY = 'analytics-opt-out';
export const CONSENT_CHANGE_EVENT = 'analytics-consent-change';
export const OPEN_CONSENT_EVENT = 'analytics-open-consent';

const read = (key: string) => { try { return localStorage.getItem(key); } catch { return null; } };
const write = (key: string, value: string | null) => {
  try { value === null ? localStorage.removeItem(key) : localStorage.setItem(key, value); } catch { /* storage blocked */ }
};

export const getConsent = (): Consent | null => {
  const value = read(CONSENT_KEY);
  return value === 'granted' || value === 'denied' ? value : null;
};

export function setConsent(consent: Consent) {
  write(CONSENT_KEY, consent);
  if (consent === 'denied') {
    window.gtag?.('consent', 'update', { analytics_storage: 'denied' });
    clearAnalyticsCookies();
  }
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}

// Visit any page with ?analytics=off once to stop counting your own visits in this browser (?analytics=on undoes it).
export function isOptedOut() {
  const param = new URLSearchParams(window.location.search).get('analytics');
  if (param === 'off') write(OPT_OUT_KEY, '1');
  if (param === 'on') write(OPT_OUT_KEY, null);
  return read(OPT_OUT_KEY) === '1';
}

export function track(event: string, params?: Record<string, string | undefined>) {
  window.gtag?.('event', event, params);
}

function clearAnalyticsCookies() {
  document.cookie.split(';').map((cookie) => cookie.split('=')[0].trim()).filter((name) => name.startsWith('_ga')).forEach((name) => {
    document.cookie = `${name}=; Max-Age=0; path=/`;
    document.cookie = `${name}=; Max-Age=0; path=/; domain=${window.location.hostname}`;
  });
}
