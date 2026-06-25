import { BENROSO_MAP_QUERY } from '@/config/benroso';
import { Icons } from '@/components/icons';

type ContactSidebarMapProps = {
  mapQuery?: string;
};

export function ContactSidebarMap({ mapQuery = BENROSO_MAP_QUERY }: ContactSidebarMapProps) {
  const encodedQuery = encodeURIComponent(mapQuery);
  const mapSrc = `https://maps.google.com/maps?q=${encodedQuery}&output=embed`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`;

  return (
    <div className='benroso-contact-sidebar-map'>
      <iframe
        allowFullScreen
        className='benroso-contact-sidebar-map-frame'
        loading='lazy'
        referrerPolicy='no-referrer-when-downgrade'
        sandbox='allow-scripts allow-same-origin allow-popups'
        src={mapSrc}
        title='Benroso Safaris office location map'
      />
      <a
        className='benroso-contact-sidebar-map-link'
        href={mapsUrl}
        rel='noopener noreferrer'
        target='_blank'
      >
        Open in Google Maps
        <Icons.externalLink className='h-3.5 w-3.5' />
      </a>
    </div>
  );
}
