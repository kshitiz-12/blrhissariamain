export type IntentLabel = 'genuine' | 'browsing' | 'unclear'

export type LeadDraft = {
  name?: string
  phone?: string
  interest?: string
  occasion?: string
  timeline?: string
  budget?: string
  notes: string[]
}

export type IntentState = {
  score: number
  browsingFlags: number
  label: IntentLabel
  reasons: string[]
}

export type FlowStep =
  | 'chat'
  | 'interest'
  | 'occasion'
  | 'timeline'
  | 'budget'
  | 'name'
  | 'phone'
  | 'done'

const GENUINE = [
  { re: /\b(buy|purchase|order|book|appointment|visit|come\s*in|showroom|meet|consult)\b/i, w: 2 },
  { re: /\b(bridal|wedding|engagement|mangalsutra|trousseau)\b/i, w: 3 },
  { re: /\b(urgent|asap|this\s*week|tomorrow|today|weekend|next\s*week)\b/i, w: 2 },
  { re: /\b(budget|ready\s*to\s*spend|lakhs?|thousand|₹|rs\.?)\b/i, w: 2 },
  { re: /\b(necklace|bangle|ring|earring|set|jewellery|jewelry|diamond|gold)\b/i, w: 1 },
  { re: /\b(quote|price\s*for|making\s*charge|custom|design)\b/i, w: 2 },
  { re: /\b(my\s*name|call\s*me|whatsapp\s*me|contact\s*me)\b/i, w: 2 },
]

const BROWSING = [
  { re: /\b(just\s*looking|window\s*shop|browsing|only\s*checking|casual)\b/i, w: 3 },
  { re: /\b(not\s*sure|maybe\s*later|no\s*rush|someday|just\s*curious|only\s*rate|gold\s*rate)\b/i, w: 2 },
  { re: /\b(not\s*interested|don'?t\s*want|no\s*thanks|leave\s*me)\b/i, w: 4 },
  { re: /\b(timing|hours|address|map|direction|where\s*are\s*you)\b/i, w: 1 },
]

export function emptyLead(): LeadDraft {
  return { notes: [] }
}

export function emptyIntent(): IntentState {
  return { score: 0, browsingFlags: 0, label: 'unclear', reasons: [] }
}

export function scoreMessage(text: string, prev: IntentState): IntentState {
  let score = prev.score
  let browsingFlags = prev.browsingFlags
  const reasons = [...prev.reasons]

  for (const g of GENUINE) {
    if (g.re.test(text)) {
      score += g.w
      reasons.push(`genuine+${g.w}`)
    }
  }
  for (const b of BROWSING) {
    if (b.re.test(text)) {
      browsingFlags += b.w
      score -= Math.min(2, b.w)
      reasons.push(`browse+${b.w}`)
    }
  }

  if (/\b[6-9]\d{9}\b/.test(text.replace(/\s+/g, '')) || /\+91[\s-]?\d{10}/.test(text)) {
    score += 3
    reasons.push('phone+3')
  }

  score = Math.max(0, Math.min(20, score))

  let label: IntentLabel = 'unclear'
  if (browsingFlags >= 3 && score < 5) label = 'browsing'
  else if (score >= 5 && browsingFlags < 4) label = 'genuine'
  else if (score >= 3) label = 'unclear'

  return { score, browsingFlags, label, reasons: reasons.slice(-12) }
}

export function shouldNotifyOwner(intent: IntentState, lead: LeadDraft): boolean {
  if (!lead.phone) return false
  if (intent.label === 'browsing') return false
  if (intent.browsingFlags >= 4 && intent.score < 6) return false
  return intent.score >= 5 || intent.label === 'genuine'
}

export function extractPhone(text: string): string | undefined {
  const cleaned = text.replace(/[^\d+]/g, ' ')
  const m = cleaned.match(/(?:\+91)?[\s-]?([6-9]\d{9})/)
  return m ? `+91${m[1]}` : undefined
}

const NOT_A_NAME =
  /^(yes|no|ok|okay|hi|hello|namaste|today|tomorrow|tonight|weekend|gift|browsing|skip|later|buy|ring|gold|diamond|budget)$/i

function looksLikePersonName(name: string): boolean {
  const n = name.trim()
  if (!n || n.length < 2 || n.length > 40) return false
  if (NOT_A_NAME.test(n)) return false
  if (/\d|₹|rs\.?|lakh|lac|\bl\b|budget|buy|want|visit|ring|gold|diamond|jewellery|jewelry/i.test(n)) {
    return false
  }
  const words = n.split(/\s+/)
  if (words.length > 4) return false
  return words.every((w) => /^[A-Za-z][A-Za-z'.]*$/.test(w))
}

export function extractName(text: string): string | undefined {
  const t = text.trim()
  const labeled = t.match(
    /(?:my name is|this is|i am|i'm)\s+([A-Za-z][A-Za-z .']{1,40}?)(?:[.!,]|$)/i,
  )
  if (labeled) {
    const name = labeled[1].trim().replace(/\s+/g, ' ')
    if (looksLikePersonName(name)) return name
  }
  // Bare name only when the whole message is just a short personal name
  if (/^[A-Za-z][A-Za-z'.]*(?:\s+[A-Za-z][A-Za-z'.]*){0,3}$/.test(t) && looksLikePersonName(t)) {
    return t.replace(/\s+/g, ' ')
  }
  return undefined
}

export function extractBudget(text: string): string | undefined {
  const t = text.trim()
  if (/^\s*(skip|later|na|n\/a|no budget)\s*$/i.test(t)) return 'Not shared'

  const lakh =
    t.match(/(?:₹|rs\.?\s*)?(\d+(?:\.\d+)?)\s*(?:-\s*(\d+(?:\.\d+)?))?\s*(?:lakh|lac|lacs|lakhs|l)\b/i) ||
    t.match(/budget\s*(?:is|of|around|about|~)?\s*(?:₹|rs\.?\s*)?(\d+(?:\.\d+)?)\s*(?:-\s*(\d+(?:\.\d+)?))?\s*(?:lakh|lac|lacs|lakhs|l)?\b/i)
  if (lakh) {
    const a = lakh[1]
    const b = lakh[2]
    return b ? `₹${a}–${b}L` : `₹${a}L`
  }

  const thousands =
    t.match(/(?:₹|rs\.?\s*)?(\d+(?:\.\d+)?)\s*(?:-\s*(\d+(?:\.\d+)?))?\s*k\b/i) ||
    t.match(/(?:under|below|upto|up to)\s*(?:₹|rs\.?\s*)?(\d+(?:\.\d+)?)\s*k\b/i)
  if (thousands) {
    const a = thousands[1]
    const b = thousands[2]
    if (/under|below|upto|up to/i.test(t)) return `under ₹${a}k`
    return b ? `₹${a}–${b}k` : `₹${a}k`
  }

  const band = t.match(/\b(under\s*₹?\s*50k|₹?\s*50k\s*[–\-]\s*2l|₹?\s*2l\s*[–\-]\s*5l|5l\+)\b/i)
  if (band) return band[1].replace(/\s+/g, ' ')

  return undefined
}

export function extractOccasion(text: string): string | undefined {
  if (/\b(wedding|bridal|trousseau)\b/i.test(text)) return 'wedding / bridal'
  if (/\b(engagement)\b/i.test(text)) return 'engagement'
  if (/\b(gift|present)\b/i.test(text)) return 'gift'
  if (/\b(personal|myself|self|daily\s*wear|own\s*use)\b/i.test(text)) return 'personal wear'
  if (/\b(brows|just\s*look|curious)\b/i.test(text)) return 'browsing'
  return undefined
}

export function extractTimeline(text: string): string | undefined {
  if (/\b(today|tonight|now|asap|urgent)\b/i.test(text)) return 'today'
  if (/\b(tomorrow)\b/i.test(text)) return 'tomorrow'
  if (/\b(this\s*weekend|weekend)\b/i.test(text)) return 'this weekend'
  if (/\b(this\s*week)\b/i.test(text)) return 'this week'
  if (/\b(this\s*month|within\s*a\s*month)\b/i.test(text)) return 'this month'
  if (/\b(next\s*week)\b/i.test(text)) return 'next week'
  if (/\b(no\s*(fixed\s*)?timeline|someday|later|not\s*sure|no\s*rush)\b/i.test(text)) {
    return 'no fixed timeline'
  }
  return undefined
}

/** Fill any missing lead fields found in free-form text (e.g. "gift and budget is 1.5L"). */
export function enrichLeadFromText(lead: LeadDraft, text: string): LeadDraft {
  const next = { ...lead, notes: lead.notes }
  if (!next.budget) {
    const budget = extractBudget(text)
    if (budget) next.budget = budget
  }
  if (!next.occasion) {
    const occasion = extractOccasion(text)
    if (occasion) next.occasion = occasion
  }
  if (!next.timeline) {
    const timeline = extractTimeline(text)
    if (timeline) next.timeline = timeline
  }
  if (!next.phone) {
    const phone = extractPhone(text)
    if (phone) next.phone = phone
  }
  if (!next.name) {
    const name = extractName(text)
    if (name) next.name = name
  }
  return next
}

export function nextQualifyStep(lead: LeadDraft): FlowStep {
  if (!lead.interest) return 'interest'
  if (!lead.occasion) return 'occasion'
  if (!lead.timeline) return 'timeline'
  if (!lead.budget) return 'budget'
  if (!lead.name) return 'name'
  if (!lead.phone) return 'phone'
  return 'done'
}

export function promptFor(step: FlowStep): string {
  switch (step) {
    case 'interest':
      return 'What are you looking for today — bridal set, diamond jewellery, gold daily wear, traditional pieces, or something custom?'
    case 'occasion':
      return 'Is this for a wedding / engagement, a gift, personal wear, or are you mainly browsing for now?'
    case 'timeline':
      return 'When would you like to finalise or visit — this week, this month, or no fixed timeline yet?'
    case 'budget':
      return 'Do you have a rough budget band? (e.g. under ₹50k, ₹50k–2L, ₹2L–5L, 5L+) — optional, you can say “skip”.'
    case 'name':
      return 'May I have your name so our showroom team can assist you properly?'
    case 'phone':
      return 'Please share a WhatsApp / mobile number so we can reach you if you want help from the store.'
    default:
      return ''
  }
}

export function applyAnswer(step: FlowStep, text: string, lead: LeadDraft): LeadDraft {
  let next = { ...lead, notes: [...lead.notes, text] }
  const t = text.trim()
  switch (step) {
    case 'interest':
      next.interest = t
      break
    case 'occasion':
      next.occasion = extractOccasion(t) ?? t
      break
    case 'timeline':
      next.timeline = extractTimeline(t) ?? t
      break
    case 'budget':
      next.budget = extractBudget(t) ?? (/skip|later|na|n\/a/i.test(t) ? 'Not shared' : t)
      break
    case 'name':
      next.name = extractName(t) ?? t.slice(0, 40)
      break
    case 'phone': {
      const phone = extractPhone(t)
      if (phone) next.phone = phone
      break
    }
    default:
      break
  }
  // Pull any other fields the user volunteered in the same message
  next = enrichLeadFromText(next, t)
  return next
}

export function formatLeadSummary(lead: LeadDraft, intent: IntentState): string {
  return [
    'New website lead — B.L. Hissaria',
    `Intent: ${intent.label.toUpperCase()} (score ${intent.score})`,
    `Name: ${lead.name ?? '—'}`,
    `Phone: ${lead.phone ?? '—'}`,
    `Interest: ${lead.interest ?? '—'}`,
    `Occasion: ${lead.occasion ?? '—'}`,
    `Timeline: ${lead.timeline ?? '—'}`,
    `Budget: ${lead.budget ?? '—'}`,
  ].join('\n')
}
