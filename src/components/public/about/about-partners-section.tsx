import Image from 'next/image';

import { Icons } from '@/components/icons';
import { BenrosoButton } from '@/components/public/ui/benroso-button';
import { SectionHeader } from '@/components/public/ui/section-header';
import { BENROSO_KATO } from '@/config/benroso';
import type { AboutPartner } from '@/lib/public/about-placeholders';

type AboutPartnersSectionProps = {
  contactHref: string;
  partners: AboutPartner[];
};

const CATEGORY_LABELS: Record<AboutPartner['category'], string> = {
  conservation: 'Conservation',
  industry: 'Industry Affiliations',
  platform: 'Review Platforms',
  regulatory: 'Regulatory'
};

export function AboutPartnersSection({ contactHref, partners }: AboutPartnersSectionProps) {
  const categories = ['regulatory', 'industry', 'platform', 'conservation'] as const;

  return (
    <div className='space-y-0'>
      <section className='benroso-section bg-white'>
        <div className='benroso-container'>
          <SectionHeader
            description='Committed to offering the best and most diverse services to meet your varying needs at very competitive prices while still being personalized.'
            eyebrow='Trust & Affiliations'
            title='Our Partners and Affiliations'
          />

          <div className='mt-12 grid gap-6 md:grid-cols-2'>
            <div className='relative aspect-[16/10] overflow-hidden rounded-[var(--benroso-radius)] bg-[var(--benroso-primary)]'>
              <Image
                alt='Safari conservation and wildlife in Kenya'
                className='object-cover'
                fill
                sizes='(max-width:768px) 100vw, 50vw'
                src='https://images.unsplash.com/photo-1551632811-561732f81182?auto=format&fit=crop&w=1200&q=80'
              />
            </div>
            <div className='flex flex-col justify-center rounded-[var(--benroso-radius)] border border-[var(--benroso-line)] bg-[var(--benroso-ivory)] p-8'>
              <Icons.badgeCheck className='h-8 w-8 text-[var(--benroso-accent)]' />
              <h3 className='benroso-heading mt-4 font-display text-2xl'>
                Licensed & Industry-Recognized
              </h3>
              <p className='benroso-body mt-4 text-sm leading-7'>
                Benroso Safaris operates as a fully registered tour operator under TRA regulation,
                with active membership in KATO and alignment with KPSGA guide certification
                standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {categories.map((category, index) => {
        const items = partners.filter((p) => p.category === category);
        if (!items.length) return null;

        return (
          <section
            className={`benroso-section ${index % 2 === 0 ? 'bg-[var(--benroso-ivory)]' : 'bg-white'}`}
            key={category}
          >
            <div className='benroso-container'>
              <h2 className='benroso-heading font-display text-2xl md:text-3xl'>
                {CATEGORY_LABELS[category]}
              </h2>
              <div className='mt-8 grid gap-5 md:grid-cols-2'>
                {items.map((partner) => (
                  <article
                    className='flex gap-5 rounded-[var(--benroso-radius)] border border-[var(--benroso-line)] bg-white p-6'
                    key={partner.id}
                  >
                    <div className='flex h-16 w-16 shrink-0 items-center justify-center rounded-[var(--benroso-radius)] border border-[var(--benroso-line)] bg-[var(--benroso-ivory)]'>
                      {partner.logoPath ? (
                        <Image
                          alt={partner.name}
                          className='object-contain p-2'
                          height={56}
                          src={partner.logoPath}
                          width={56}
                        />
                      ) : partner.id === 'partner-kato' ? (
                        <Image
                          alt={BENROSO_KATO.alt}
                          className='object-contain p-1'
                          height={56}
                          src={BENROSO_KATO.logoPath}
                          width={56}
                        />
                      ) : (
                        <Icons.badgeCheck className='h-8 w-8 text-[var(--benroso-accent)]' />
                      )}
                    </div>
                    <div>
                      <h3 className='benroso-heading font-display text-lg'>
                        {partner.url ? (
                          <a
                            className='hover:text-[var(--benroso-primary)]'
                            href={partner.url}
                            rel='noopener noreferrer'
                            target='_blank'
                          >
                            {partner.name}
                          </a>
                        ) : (
                          partner.name
                        )}
                      </h3>
                      <p className='benroso-body mt-2 text-sm leading-7'>{partner.description}</p>
                      {partner.url ? (
                        <a
                          className='mt-3 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-[var(--benroso-accent)]'
                          href={partner.url}
                          rel='noopener noreferrer'
                          target='_blank'
                        >
                          Visit partner
                          <Icons.externalLink className='h-3.5 w-3.5' />
                        </a>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className='border-t border-[var(--benroso-line)] bg-[var(--benroso-primary-dark)] text-white'>
        <div className='benroso-container py-14 text-center md:py-16'>
          <h2 className='font-display text-2xl md:text-3xl'>
            Conservation Through Responsible Tourism
          </h2>
          <p className='mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/80'>
            Every safari contributes to keeping East Africa wild and beautiful — through park fees,
            conservancy partnerships, and guest education on wildlife ethics.
          </p>
          <div className='mt-8'>
            <BenrosoButton href={contactHref}>Plan a Conservation-Focused Safari</BenrosoButton>
          </div>
        </div>
      </section>
    </div>
  );
}
