'use client';

import { useEffect, useState } from 'react';
import { type Consent, getConsent, OPEN_CONSENT_EVENT, setConsent } from './analytics';

export default function ConsentBanner({ isPortuguese }: { isPortuguese: boolean }) {
  const [open, setOpen] = useState(false);
  const text = (english: string, portuguese: string) => isPortuguese ? portuguese : english;

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_GA_ID) return;
    setOpen(getConsent() === null);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (consent: Consent) => { setConsent(consent); setOpen(false); };

  return <div className="consent-banner" role="dialog" aria-live="polite" aria-label={text('Cookie consent', 'Consentimento de cookies')}>
    <p>{text('I use Google Analytics to see which parts of this site are useful. It only sets cookies if you accept.', 'Uso o Google Analytics para entender quais partes do site são úteis. Os cookies só são criados se você aceitar.')}</p>
    <div className="consent-actions">
      <button className="outline-button" onClick={() => choose('denied')}>{text('Decline', 'Recusar')}</button>
      <button className="outline-button" onClick={() => choose('granted')}>{text('Accept', 'Aceitar')}</button>
    </div>
  </div>;
}
