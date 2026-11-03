import { useState, type FormEvent, type ReactNode } from 'react'
import Seo from '../components/Seo'
import { SITE } from '../seo/site'

const MAP_EMBED =
  'https://maps.google.com/maps?q=29.582178,74.3251981&hl=en&z=16&output=embed'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <>
      <Seo
        path="/contact"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Contact Us', path: '/contact' },
        ]}
      />

      <div className="bg-cream pt-16 md:pt-[72px]">
        <section className="mx-auto max-w-[1440px] px-5 py-10 md:px-10 md:py-12 lg:px-14 lg:py-14">
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-0">
            {/* Left — Get in Touch */}
            <div className="lg:col-span-4 lg:pr-10 xl:pr-14">
              <p className="page-eyebrow">Get in Touch</p>
              <h1 className="page-title mt-3 text-[2.5rem] leading-[1.1] md:text-[3.1rem] lg:text-[3.35rem]">
                We’d Love to Hear
                <br />
                From You.
              </h1>
              <p className="page-body mt-5 max-w-[22rem]">
                Whether you’re looking for a special piece, a custom design or simply have a
                question, our team is always here to assist you.
              </p>

              <ul className="mt-9 space-y-6">
                <InfoRow
                  href={`tel:${SITE.phone}`}
                  title={SITE.phoneDisplay}
                  detail="Mon – Sat, 10:00 AM – 8:00 PM"
                  icon={
                    <path
                      d="M6.5 4.5c.4-.4 1-.5 1.5-.3l2 1c.5.2.8.7.7 1.2l-.4 2a1 1 0 00.3.9l2.4 2.4a1 1 0 00.9.3l2-.4c.5-.1 1 .2 1.2.7l1 2c.2.5.1 1.1-.3 1.5l-1.2 1.2c-.5.5-1.2.7-1.9.5C10.2 17 7 13.8 4.5 9.2c-.2-.7 0-1.4.5-1.9L6.5 4.5z"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      fill="none"
                      strokeLinejoin="round"
                    />
                  }
                />
                <InfoRow
                  href={`mailto:${SITE.email}`}
                  title={SITE.email}
                  detail="We typically respond within 24 hours"
                  icon={
                    <path
                      d="M4 7h16v10H4V7zm0 0l8 6 8-6"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      fill="none"
                      strokeLinejoin="round"
                    />
                  }
                />
                <InfoRow
                  href={SITE.mapsUrl}
                  external
                  title="Our Showroom"
                  detail={`${SITE.street}, ${SITE.city} – ${SITE.postal}\n${SITE.region}, India`}
                  icon={
                    <>
                      <path
                        d="M12 21s7-5.2 7-11a7 7 0 10-14 0c0 5.8 7 11 7 11z"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        fill="none"
                      />
                      <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.2" fill="none" />
                    </>
                  }
                />
              </ul>

              <div className="mt-10 flex gap-5 text-forest/70">
                {(
                  [
                    { label: 'Instagram', href: SITE.social.instagram, d: 'M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zm5 5a4 4 0 100 8 4 4 0 000-8zm5.2-.9a1 1 0 11-2 0 1 1 0 012 0z' },
                    { label: 'Facebook', href: SITE.social.facebook, d: 'M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h2.5l.5-3H14V9z' },
                    { label: 'YouTube', href: SITE.social.youtube, d: 'M22 8.2a3 3 0 00-2.1-2.1C18.2 5.5 12 5.5 12 5.5s-6.2 0-7.9.6A3 3 0 002 8.2 31 31 0 001.5 12a31 31 0 00.5 3.8 3 3 0 002.1 2.1c1.7.6 7.9.6 7.9.6s6.2 0 7.9-.6a3 3 0 002.1-2.1 31 31 0 00.5-3.8 31 31 0 00-.5-3.8zM10 15.2V8.8l5.2 3.2L10 15.2z' },
                    { label: 'Pinterest', href: SITE.social.pinterest, d: 'M12 2C6.5 2 2 6.3 2 11.6c0 3.9 2.4 7.2 5.8 8.5-.1-.7-.2-1.8 0-2.6.2-.7 1.3-5.4 1.3-5.4s-.3-.7-.3-1.6c0-1.5.9-2.6 2-2.6.9 0 1.4.7 1.4 1.5 0 .9-.6 2.3-.9 3.5-.3 1.1.5 1.9 1.5 1.9 1.8 0 3.2-1.9 3.2-4.7 0-2.4-1.8-4.2-4.3-4.2-2.9 0-4.7 2.2-4.7 4.4 0 .9.3 1.8.8 2.3.1.1.1.2.1.3l-.3 1.1c0 .2-.1.2-.3.1-1.3-.6-2.1-2.5-2.1-4 0-3.3 2.4-6.3 6.8-6.3 3.6 0 6.3 2.5 6.3 5.9 0 3.5-2.2 6.4-5.3 6.4-1 0-2-.5-2.3-1.2l-.6 2.4c-.2.9-.8 2-1.2 2.7 1 .3 2 .4 3.1.4 5.5 0 10-4.3 10-9.6C22 6.3 17.5 2 12 2z' },
                  ] as const
                ).map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-gold"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d={s.d} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Center — Form */}
            <div className="border-forest/10 lg:col-span-4 lg:border-l lg:px-10 xl:px-12">
              <p className="page-eyebrow">Send us a Message</p>

              {sent ? (
                <div className="mt-16 text-center">
                  <p className="font-display text-3xl text-forest">Thank you.</p>
                  <p className="page-body mt-3">We’ve received your message and will respond shortly.</p>
                </div>
              ) : (
                <form className="mt-6 space-y-3.5" onSubmit={onSubmit}>
                  <BoxedField label="Full Name *" name="name" required />
                  <BoxedField label="Email Address *" name="email" type="email" required />
                  <BoxedField label="Phone Number" name="phone" type="tel" />
                  <div>
                    <label className="sr-only" htmlFor="enquiry">
                      Enquiry Type
                    </label>
                    <select
                      id="enquiry"
                      name="enquiry"
                      defaultValue=""
                      required
                      className="w-full appearance-none border border-forest/15 bg-cream-dark/40 px-4 py-3.5 font-sans text-sm text-forest outline-none transition-colors focus:border-gold"
                    >
                      <option value="" disabled>
                        Select Enquiry Type
                      </option>
                      <option>Appointment</option>
                      <option>Bridal Consultation</option>
                      <option>Custom Design</option>
                      <option>General Enquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="sr-only" htmlFor="message">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      placeholder="Your Message *"
                      className="w-full resize-none border border-forest/15 bg-cream-dark/40 px-4 py-3.5 font-sans text-sm text-forest placeholder:text-muted outline-none transition-colors focus:border-gold"
                    />
                  </div>
                  <button type="submit" className="btn-forest mt-2 w-full justify-center">
                    Send Message →
                  </button>
                </form>
              )}
            </div>

            {/* Right — Arch visual */}
            <div className="flex justify-center lg:col-span-4 lg:justify-end">
              <figure className="arch-frame relative h-[460px] w-[260px] shadow-[0_24px_50px_rgba(11,28,20,0.18)] sm:h-[520px] sm:w-[300px] md:h-[560px] md:w-[320px] lg:h-[580px] lg:w-[340px]">
                <img
                  src="/images/contact-arch.jpg"
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/55 via-forest/10 to-transparent" />
                <figcaption className="absolute inset-x-6 bottom-10 text-center font-display text-[0.95rem] leading-snug tracking-[0.06em] text-cream uppercase md:inset-x-8 md:text-[1.05rem]">
                  Let’s create something
                  <br />
                  extraordinary together.
                </figcaption>
              </figure>
            </div>
          </div>

          {/* Maps add-on */}
          <div className="mt-14 border-t border-forest/10 pt-10 md:mt-16 md:pt-12">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="page-eyebrow">Visit</p>
                <h2 className="page-title mt-2 text-2xl md:text-3xl">Find us on the map</h2>
                <p className="mt-2 text-sm font-light text-muted">
                  {SITE.street}, {SITE.city}, {SITE.region} {SITE.postal}
                </p>
              </div>
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                Get Directions →
              </a>
            </div>
            <div className="overflow-hidden border border-forest/10">
              <iframe
                title="B.L. Hissaria Jewellers location map"
                src={MAP_EMBED}
                className="block h-[260px] w-full border-0 md:h-[320px] grayscale-[15%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

function InfoRow({
  href,
  title,
  detail,
  icon,
  external,
}: {
  href: string
  title: string
  detail: string
  icon: ReactNode
  external?: boolean
}) {
  return (
    <li>
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="group flex gap-4"
      >
        <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest text-cream transition-colors group-hover:bg-gold group-hover:text-forest">
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
            {icon}
          </svg>
        </span>
        <span>
          <span className="block font-display text-lg leading-tight text-forest transition-colors group-hover:text-gold md:text-[1.2rem]">
            {title}
          </span>
          <span className="mt-1 block whitespace-pre-line font-sans text-[0.8125rem] font-light leading-relaxed text-muted">
            {detail}
          </span>
        </span>
      </a>
    </li>
  )
}

function BoxedField({
  label,
  name,
  type = 'text',
  required,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
}) {
  return (
    <div>
      <label className="sr-only" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={label}
        className="w-full border border-forest/15 bg-cream-dark/40 px-4 py-3.5 font-sans text-sm text-forest placeholder:text-muted outline-none transition-colors focus:border-gold"
      />
    </div>
  )
}
