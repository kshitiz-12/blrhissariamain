import { STORE } from '../config.js'
import {
  applyAnswer,
  emptyIntent,
  emptyLead,
  enrichLeadFromText,
  extractPhone,
  nextQualifyStep,
  promptFor,
  scoreMessage,
  type FlowStep,
  type IntentState,
  type LeadDraft,
} from './intent.js'
import { generateSunehriReply, type ChatTurn } from './llm.js'
import { notifyOwnerIfGenuine } from './notify.js'

export type ChatRequest = {
  message: string
  history?: ChatTurn[]
  lead?: LeadDraft
  intent?: IntentState
  step?: FlowStep
  notified?: boolean
}

export type ChatResponse = {
  reply: string
  lead: LeadDraft
  intent: IntentState
  step: FlowStep
  notified: boolean
  notifyReason?: string
  usedLlm: boolean
}

function faqFallback(input: string): string | null {
  const q = input.toLowerCase()
  if (/(time|hour|open|close|timing)/.test(q)) {
    return `We’re open ${STORE.hours}.`
  }
  if (/(address|where|location|map|direction)/.test(q)) {
    return `Visit us at ${STORE.street}, ${STORE.city}, ${STORE.region} ${STORE.postal}.`
  }
  if (/(gold|rate|hallmark|bis|22kt|24kt)/.test(q)) {
    return `Live 22kt rate is in the website header (IBJA indicative metal value). Making charges & GST are extra. Tell me what piece you’re considering for a guided quote.`
  }
  if (/(hello|hi|hey|namaste)/.test(q)) {
    return `Namaste! I’m Sunehri from ${STORE.shortName}. How can I help — timings, directions, collections, or choosing a piece?`
  }
  return null
}

async function finishLead(
  lead: LeadDraft,
  intent: IntentState,
  history: ChatTurn[],
  userMessage: string,
  alreadyNotified: boolean,
): Promise<ChatResponse> {
  if (!lead.phone) {
    const fallback = `I still need a valid 10-digit mobile number. Please share your WhatsApp number.`
    const { text, usedLlm } = await generateSunehriReply({
      history,
      userMessage,
      step: 'phone',
      lead,
      intent,
      nextQuestion: promptFor('phone'),
      mode: 'qualify',
      fallback,
    })
    return { reply: text, lead, intent, step: 'phone', notified: alreadyNotified, usedLlm }
  }

  const browsing =
    intent.label === 'browsing' ||
    (intent.browsingFlags >= 4 && intent.score < 6) ||
    /brows|looking|curious|later|not sure/i.test(`${lead.occasion ?? ''} ${lead.timeline ?? ''}`)

  const genuine = intent.label === 'genuine' || intent.score >= 5

  if (browsing && !genuine) {
    const fallback = `Thanks${lead.name ? `, ${lead.name}` : ''}. It sounds like you’re still exploring — that’s fine. I won’t notify the showroom. Say “I want to buy” whenever you’re ready.`
    const { text, usedLlm } = await generateSunehriReply({
      history,
      userMessage,
      step: 'done',
      lead,
      intent,
      mode: 'closing',
      fallback,
    })
    return { reply: text, lead, intent, step: 'done', notified: alreadyNotified, usedLlm }
  }

  if (!genuine && intent.score < 5) {
    const fallback = `Thank you${lead.name ? `, ${lead.name}` : ''}. I’ve noted your preferences. Intent isn’t clear enough yet, so I won’t disturb the owner. Reply “I’m ready to visit” if you’d like a call.`
    const { text, usedLlm } = await generateSunehriReply({
      history,
      userMessage,
      step: 'done',
      lead,
      intent,
      mode: 'closing',
      fallback,
    })
    return { reply: text, lead, intent, step: 'done', notified: alreadyNotified, usedLlm }
  }

  if (alreadyNotified) {
    return {
      reply: `Your enquiry was already shared with the showroom. We’ll take it from here — or WhatsApp ${STORE.phoneDisplay}.`,
      lead,
      intent,
      step: 'done',
      notified: true,
      notifyReason: 'already_sent',
      usedLlm: false,
    }
  }

  const result = await notifyOwnerIfGenuine(lead, intent)
  if (result.sent) {
    const fallback = `Thank you${lead.name ? `, ${lead.name}` : ''}. You’re a genuine enquiry — I’ve informed the showroom. You can also WhatsApp us at ${STORE.phoneDisplay}.`
    const { text, usedLlm } = await generateSunehriReply({
      history,
      userMessage,
      step: 'done',
      lead,
      intent,
      mode: 'closing',
      fallback,
    })
    return {
      reply: text,
      lead,
      intent,
      step: 'done',
      notified: true,
      notifyReason: result.reason,
      usedLlm,
    }
  }

  return {
    reply: `Thank you${lead.name ? `, ${lead.name}` : ''}. I couldn’t email the store automatically — please WhatsApp ${STORE.phoneDisplay} with your details, or use Book Visit on the site.`,
    lead,
    intent,
    step: 'done',
    notified: false,
    notifyReason: result.reason,
    usedLlm: false,
  }
}

export async function handleChat(req: ChatRequest): Promise<ChatResponse> {
  const message = (req.message || '').trim()
  if (!message) {
    return {
      reply: 'Please type a message and I’ll help.',
      lead: req.lead ?? emptyLead(),
      intent: req.intent ?? emptyIntent(),
      step: req.step ?? 'chat',
      notified: Boolean(req.notified),
      usedLlm: false,
    }
  }

  const history = req.history ?? []
  let lead = req.lead ?? emptyLead()
  let intent = scoreMessage(message, req.intent ?? emptyIntent())
  let step: FlowStep = req.step ?? 'chat'
  let notified = Boolean(req.notified)

  // Explicit browsing
  if (/\b(just browsing|only looking|window shop|not interested|no thanks)\b/i.test(message)) {
    intent = scoreMessage(message, intent)
    step = 'chat'
    const fallback =
      'Of course — enjoy browsing. Explore our collections anytime, and say “I want to buy” when you’d like personal help.'
    const { text, usedLlm } = await generateSunehriReply({
      history,
      userMessage: message,
      step,
      lead,
      intent,
      mode: 'chat',
      fallback,
    })
    return { reply: text, lead, intent, step, notified, usedLlm }
  }

  // Start qualification
  const wantsQualify =
    step === 'chat' &&
    /\b(buy|purchase|visit|appointment|book|bridal|wedding|want to buy|i'?m ready|interested)\b/i.test(
      message,
    )

  if (wantsQualify || (step === 'chat' && (intent.label === 'genuine' || intent.score >= 4))) {
    if (!lead.interest) lead = { ...lead, interest: message, notes: [...lead.notes, message] }
    else lead = { ...lead, notes: [...lead.notes, message] }
    lead = enrichLeadFromText(lead, message)

    const next = nextQualifyStep(lead)
    if (next === 'done') return finishLead(lead, intent, history, message, notified)

    step = next
    const q = promptFor(next)
    const fallback =
      intent.label === 'browsing'
        ? `No pressure — browse freely. If you want help later, say “I want to buy”. ${q}`
        : `I’d love to help. ${q}`
    const { text, usedLlm } = await generateSunehriReply({
      history,
      userMessage: message,
      step,
      lead,
      intent,
      nextQuestion: q,
      mode: 'qualify',
      fallback,
    })
    return { reply: text, lead, intent, step, notified, usedLlm }
  }

  // Free chat
  if (step === 'chat') {
    const faq = faqFallback(message)
    const fallback =
      faq ??
      `I can help with timings, address, gold rate, collections — or guide a purchase. Are you browsing, or would you like help choosing / booking a visit?`
    const { text, usedLlm } = await generateSunehriReply({
      history,
      userMessage: message,
      step,
      lead,
      intent,
      mode: 'chat',
      fallback,
    })
    return { reply: text, lead, intent, step, notified, usedLlm }
  }

  // Phone validation
  if (step === 'phone' && !extractPhone(message)) {
    const fallback = 'Please share a valid 10-digit Indian mobile number (WhatsApp preferred).'
    const { text, usedLlm } = await generateSunehriReply({
      history,
      userMessage: message,
      step,
      lead,
      intent,
      nextQuestion: promptFor('phone'),
      mode: 'qualify',
      fallback,
    })
    return { reply: text, lead, intent, step, notified, usedLlm }
  }

  // Qualification answers
  if (step !== 'done') {
    if (step === 'occasion' && /\b(brows|just look|not sure|maybe later|curious)\b/i.test(message)) {
      intent = {
        ...intent,
        browsingFlags: intent.browsingFlags + 3,
        label: 'browsing',
        score: Math.max(0, intent.score - 2),
      }
    }
    if (step === 'timeline' && /\b(no timeline|someday|later|not sure)\b/i.test(message)) {
      intent = { ...intent, browsingFlags: intent.browsingFlags + 1 }
    }
    if (step === 'occasion' && /\b(wedding|bridal|engagement|gift|buy)\b/i.test(message)) {
      intent = scoreMessage(message, { ...intent, score: intent.score + 1 })
    }

    lead = applyAnswer(step, message, lead)
    const upcoming = nextQualifyStep(lead)
    if (upcoming === 'done') return finishLead(lead, intent, history, message, notified)

    step = upcoming
    const q = promptFor(upcoming)
    const { text, usedLlm } = await generateSunehriReply({
      history,
      userMessage: message,
      step,
      lead,
      intent,
      nextQuestion: q,
      mode: 'qualify',
      fallback: q,
    })
    return { reply: text, lead, intent, step, notified, usedLlm }
  }

  // Done — re-engage
  if (/\b(ready to visit|call me|want to buy|notify)\b/i.test(message)) {
    intent = { ...intent, score: Math.max(intent.score, 6), label: 'genuine' }
    return finishLead(lead, intent, history, message, notified)
  }

  const fallback = `Anything else I can help with — or say “I want to buy” to share details for the showroom.`
  const { text, usedLlm } = await generateSunehriReply({
    history,
    userMessage: message,
    step,
    lead,
    intent,
    mode: 'chat',
    fallback,
  })
  return { reply: text, lead, intent, step, notified, usedLlm }
}
