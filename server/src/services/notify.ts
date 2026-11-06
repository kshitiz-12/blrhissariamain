import { config } from '../config.js'
import { formatLeadSummary, type IntentState, type LeadDraft, shouldNotifyOwner } from './intent.js'
import { sendOwnerMail } from './mail.js'

const notified = new Set<string>()

async function sendOwnerEmail(lead: LeadDraft, intent: IntentState, summary: string): Promise<boolean> {
  await sendOwnerMail({
    subject: `[Genuine Lead] ${lead.name ?? 'Customer'} — B.L. Hissaria`,
    text: summary,
    replyTo: undefined,
    fields: {
      name: lead.name ?? 'Not shared',
      phone: lead.phone ?? '',
      interest: lead.interest ?? '',
      occasion: lead.occasion ?? '',
      timeline: lead.timeline ?? '',
      budget: lead.budget ?? '',
      intent: `${intent.label} (score ${intent.score})`,
    },
  })
  return true
}

export async function sendContactEmail(input: {
  name: string
  email: string
  phone?: string
  enquiry: string
  message: string
}): Promise<void> {
  await sendOwnerMail({
    subject: `[Contact] ${input.enquiry} — ${input.name}`,
    text: input.message,
    replyTo: input.email,
    fields: {
      name: input.name,
      email: input.email,
      phone: input.phone ?? '',
      enquiry: input.enquiry,
    },
  })
}

async function sendOwnerWhatsApp(summary: string): Promise<boolean> {
  if (!config.callMeBotApiKey) return false
  const phone = config.ownerPhone.replace(/[^\d+]/g, '')
  const text = `*B.L. Hissaria — genuine lead*\n\n${summary}`
  const url =
    `https://api.callmebot.com/whatsapp.php` +
    `?phone=${encodeURIComponent(phone)}` +
    `&text=${encodeURIComponent(text)}` +
    `&apikey=${encodeURIComponent(config.callMeBotApiKey)}`

  const res = await fetch(url, { method: 'GET', signal: AbortSignal.timeout(15000) })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`callmebot ${res.status} ${body.slice(0, 120)}`)
  }
  return true
}

export async function notifyOwnerIfGenuine(
  lead: LeadDraft,
  intent: IntentState,
): Promise<{ sent: boolean; reason: string }> {
  if (!shouldNotifyOwner(intent, lead)) {
    return { sent: false, reason: 'not_genuine' }
  }
  if (!lead.phone) return { sent: false, reason: 'missing_phone' }
  if (notified.has(lead.phone)) return { sent: false, reason: 'already_sent' }

  const summary = formatLeadSummary(lead, intent)
  const channels: string[] = []
  const errors: string[] = []

  try {
    await sendOwnerEmail(lead, intent, summary)
    channels.push('email')
  } catch (err) {
    console.error('Owner email notify failed', err)
    errors.push('email_failed')
  }

  if (config.callMeBotApiKey) {
    try {
      await sendOwnerWhatsApp(summary)
      channels.push('whatsapp')
    } catch (err) {
      console.error('Owner WhatsApp notify failed', err)
      errors.push('whatsapp_failed')
    }
  } else {
    errors.push('whatsapp_not_configured')
  }

  if (channels.length > 0) {
    notified.add(lead.phone)
    return { sent: true, reason: channels.join('+') }
  }

  return { sent: false, reason: errors.join(',') || 'notify_failed' }
}
