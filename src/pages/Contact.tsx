import { useState, type FormEvent, type ReactNode } from 'react'
import Seo from '../components/Seo'

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

      <div className="min-h-screen bg-cream pt-16 md:pt-[72px]">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-12 md:px-10 lg:grid-cols-12 lg:gap-8 lg:px-14 lg:py-14">
          {/* Left */}
          <div className="lg:col-span-4">
            <p className="page-eyebrow">Get in Touch</p>
            <h1 className="page-title mt-3 text-[2.5rem] md:text-[3rem] lg:text-[3.25rem]">
              We’d Love to Hear From You.
            </h1>
            <p className="page-body mt-4 max-w-md">
              Whether you’re looking for a special piece, a custom design or simply have a
              question, our team is always here to assist you.
            </p>

            <div className="mt-8 space-y-5">
              <ContactRow
                label="Phone"
                title="+91 80 4123 4567"
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
              <ContactRow
                label="Email"
                title="info@blhissariajewellers.com"
                detail="We typically respond within 24 hours"
                href="mailto:info@blhissariajewellers.com"
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
              <ContactRow
                label="Our Showroom"
                title="123, M.G. Road"
                detail="Bengaluru - 560001, Karnataka, India"
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
            </div>

            <div className="mt-8 flex gap-4 text-forest/65">
              {[
                { label: 'Instagram', path: 'M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zm5 5a4 4 0 100 8 4 4 0 000-8zm5.2-.9a1 1 0 11-2 0 1 1 0 012 0z' },
                { label: 'Facebook', path: 'M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h2.5l.5-3H14V9z' },
                { label: 'YouTube', path: 'M22 8.2a3 3 0 00-2.1-2.1C18.2 5.5 12 5.5 12 5.5s-6.2 0-7.9.6A3 3 0 002 8.2 31 31 0 001.5 12a31 31 0 00.5 3.8 3 3 0 002.1 2.1c1.7.6 7.9.6 7.9.6s6.2 0 7.9-.6a3 3 0 002.1-2.1 31 31 0 00.5-3.8 31 31 0 00-.5-3.8zM10 15.2V8.8l5.2 3.2L10 15.2z' },
                { label: 'Pinterest', path: 'M12 3a9 9 0 00-3.2 17.4c-.1-.7-.2-1.8 0-2.6l1.3-5.5s-.3-.7-.3-1.6c0-1.5.9-2.6 2-2.6.9 0 1.4.7 1.4 1.5 0 .9-.6 2.3-.9 3.5-.3 1.1.5 1.9 1.6 1.9 1.9 0 3.2-2.4 3.2-5.3 0-2.2-1.5-3.8-4.2-3.8-3.1 0-5 2.3-5 4.8 0 .9.3 1.5.7 2l.2.2-.1.4c0 .1-.1.4-.2.5-.1.1-.2.1-.3 0-1.2-.5-1.8-1.9-1.8-3.4 0-2.5 2.1-5.5 6.3-5.5 3.4 0 5.6 2.4 5.6 5.1 0 3.5-1.9 6.1-4.8 6.1-1 0-1.9-.5-2.2-1.1l-.6 2.3c-.2.8-.7 1.7-1.1 2.3A9 9 0 0012 21a9 9 0 000-18z' },
              ].map((social) => (
                <a key={social.label} href="#" aria-label={social.label} className="hover:text-gold transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-4">
            <div className="h-full bg-[#efe8da] px-6 py-8 md:px-8">
              <p className="font-sans text-[0.6875rem] tracking-[0.22em] uppercase text-forest/55">
                Send us a Message
              </p>

              {sent ? (
                <div className="mt-10 py-8 text-center">
                  <p className="page-title text-3xl">Thank you.</p>
                  <p className="page-body mt-3">We’ve received your message and will respond shortly.</p>
                </div>
              ) : (
                <form className="mt-6 space-y-3.5" onSubmit={onSubmit}>
                  <Field label="Full Name *" name="name" required />
                  <Field label="Email Address *" name="email" type="email" required />
                  <Field label="Phone Number" name="phone" type="tel" />
                  <div>
                    <label className="sr-only" htmlFor="enquiry">Enquiry Type</label>
                    <select
                      id="enquiry"
                      name="enquiry"
                      defaultValue=""
                      required
                      className="w-full border border-forest/20 bg-cream/50 px-3 py-3 font-sans text-sm text-forest outline-none focus:border-gold"
                    >
                      <option value="" disabled>Select Enquiry Type</option>
                      <option>Appointment</option>
                      <option>Bridal Consultation</option>
                      <option>Custom Design</option>
                      <option>General Enquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="sr-only" htmlFor="message">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      placeholder="Your Message *"
                      className="w-full resize-none border border-forest/20 bg-cream/50 px-3 py-3 font-sans text-sm text-forest placeholder:text-muted outline-none focus:border-gold"
                    />
                  </div>
                  <button type="submit" className="btn-forest mt-2">
                    Send Message →
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Arch */}
          <div className="relative min-h-[420px] overflow-hidden lg:col-span-4 lg:min-h-[560px]">
            <img
              src="/images/contact-arch.jpg"
              alt="Elegant arched interior"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-forest/40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
              <p className="font-display text-[1.5rem] font-medium leading-snug tracking-[0.06em] text-cream uppercase md:text-[1.7rem]">
                Let’s Create Something Extraordinary Together.
              </p>
              <span className="mt-5 block h-px w-14 bg-gold/70" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function ContactRow({
  label,
  title,
  detail,
  href,
  icon,
}: {
  label: string
  title: string
  detail: string
  href?: string
  icon: ReactNode
}) {
  return (
    <div className="flex gap-3.5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest text-cream">
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
          {icon}
        </svg>
      </div>
      <div>
        <p className="font-sans text-[0.625rem] tracking-[0.18em] uppercase text-forest/45">{label}</p>
        {href ? (
          <a href={href} className="mt-1 block break-all font-sans text-[0.9rem] text-forest transition-colors hover:text-gold">
            {title}
          </a>
        ) : (
          <p className="mt-1 font-sans text-[0.9rem] text-forest">{title}</p>
        )}
        <p className="mt-0.5 font-sans text-[0.8rem] font-light text-muted">{detail}</p>
      </div>
    </div>
  )
}

function Field({
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
      <label className="sr-only" htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={label}
        className="w-full border border-forest/20 bg-cream/50 px-3 py-3 font-sans text-sm text-forest placeholder:text-muted outline-none focus:border-gold"
      />
    </div>
  )
}
