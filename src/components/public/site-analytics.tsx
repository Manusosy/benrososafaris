import Script from 'next/script';

import type { SiteAnalyticsSettings } from '@/lib/public/types';

/**
 * Injects analytics on the public site only (rendered from the [locale] layout,
 * never the portal). Each integration is opt-in: it renders nothing unless the
 * corresponding id is configured in Portal > Settings > SEO & Analytics.
 *
 * GA4 and Google Ads share one gtag.js loader so both can be configured without
 * double-loading the library.
 */
export function SiteAnalytics({ analytics }: { analytics: SiteAnalyticsSettings }) {
  const { gaMeasurementId, googleAdsId, gtmId, metaPixelId } = analytics;
  const gtagPrimaryId = gaMeasurementId || googleAdsId;

  return (
    <>
      {gtagPrimaryId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gtagPrimaryId}`}
            strategy='lazyOnload'
          />
          <Script id='gtag-init' strategy='lazyOnload'>
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
${gaMeasurementId ? `gtag('config', '${gaMeasurementId}');` : ''}
${googleAdsId ? `gtag('config', '${googleAdsId}');` : ''}`}
          </Script>
        </>
      ) : null}

      {gtmId ? (
        <Script id='gtm-init' strategy='lazyOnload'>
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
        </Script>
      ) : null}

      {metaPixelId ? (
        <Script id='meta-pixel' strategy='lazyOnload'>
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${metaPixelId}');
fbq('track', 'PageView');`}
        </Script>
      ) : null}
    </>
  );
}
