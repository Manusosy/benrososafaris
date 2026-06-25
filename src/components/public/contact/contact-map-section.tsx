import { BENROSO_MAP_QUERY } from '@/config/benroso';

type ContactMapSectionProps = {
  mapQuery?: string;
};

export function ContactMapSection({ mapQuery = BENROSO_MAP_QUERY }: ContactMapSectionProps) {
  const encodedQuery = encodeURIComponent(mapQuery);
  const mapSrc = `https://maps.google.com/maps?q=${encodedQuery}&output=embed`;

  return (
    <section className='border-t border-[var(--benroso-line)] bg-white'>
      <div className='benroso-container py-10 md:py-12'>
        <div className='overflow-hidden rounded-[var(--benroso-radius)] border border-[var(--benroso-line)]'>
          <iframe
            allowFullScreen
            className='aspect-[16/9] w-full border-0'
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
            sandbox='allow-scripts allow-same-origin allow-popups'
            src={mapSrc}
            title='Benroso Safaris office location map'
          />
        </div>
      </div>
    </section>
  );
}
