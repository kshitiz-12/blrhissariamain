import nodemailer from 'nodemailer'
import { config } from '../config.js'

function smtpConfigured() {
  return Boolean(config.smtpUser && config.smtpPass)
}

async function sendViaSmtp(input: {
  subject: string
  text: string
  replyTo?: string
  fields?: Record<string, string>
}): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    secure: config.smtpPort === 465,
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
  })

  const fieldBlock = input.fields
    ? Object.entries(input.fields)
        .map(([k, v]) => `${k}: ${v}`)
        .join('\n')
    : ''

  await transporter.sendMail({
    from: `"B.L. Hissaria Website" <${config.smtpUser}>`,
    to: config.ownerEmail,
    replyTo: input.replyTo,
    subject: input.subject,
    text: [input.text, fieldBlock].filter(Boolean).join('\n\n'),
  })
}

async function sendViaFormSubmit(payload: Record<string, string>): Promise<void> {
  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(config.ownerEmail)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      _template: 'table',
      _captcha: 'false',
      ...payload,
    }),
    signal: AbortSignal.timeout(12000),
  })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`formsubmit ${res.status} ${body.slice(0, 160)}`)
  }
}

/** Prefer Gmail/SMTP (reliable). Fall back to FormSubmit if SMTP is not set. */
export async function sendOwnerMail(input: {
  subject: string
  text: string
  replyTo?: string
  fields?: Record<string, string>
}): Promise<'smtp' | 'formsubmit'> {
  if (smtpConfigured()) {
    await sendViaSmtp(input)
    return 'smtp'
  }

  await sendViaFormSubmit({
    _subject: input.subject,
    ...(input.replyTo ? { _replyto: input.replyTo } : {}),
    ...(input.fields ?? {}),
    message: input.text,
  })
  return 'formsubmit'
}

export function mailStatus() {
  return {
    smtpConfigured: smtpConfigured(),
    ownerEmail: config.ownerEmail,
  }
}
