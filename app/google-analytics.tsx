'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { CONSENT_CHANGE_EVENT, getConsent, isOptedOut, track } from './analytics';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const optedOut = isOptedOut();
    const sync = () => setEnabled(!optedOut && getConsent() === 'granted');
    sync();
    window.addEventListener(CONSENT_CHANGE_EVENT, sync);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, sync);
  }, []);

  // Any element with data-track="event_name" (and optional data-track-label) sends that event when clicked.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const element = (event.target as Element | null)?.closest<HTMLElement>('[data-track]');
      if (!element?.dataset.track) return;
      track(element.dataset.track, { link_label: element.dataset.trackLabel, link_url: element.getAttribute('href') ?? undefined });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  if (!GA_ID || !enabled) return null;

  return (
    <>
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
    </>
  );
}
