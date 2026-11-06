import { config, STORE } from '../config.js'
import type { FlowStep, IntentState, LeadDraft } from './intent.js'

export type ChatTurn = { role: 'user' | 'assistant'; content: string }

function systemPrompt(ctx: {
  step: FlowStep
  lead: LeadDraft
  intent: IntentState
  nextQuestion?: string
  mode: 'chat' | 'qualify' | 'closing'
}): string {
  return `You are Sunehri, the warm, professional jewellery assistant for ${STORE.shortName} (${STORE.name}) in ${STORE.city}, ${STORE.region}.

Store facts (only use these; never invent prices for specific pieces):
- Address: ${STORE.street}, ${STORE.city}, ${STORE.region} ${STORE.postal}
- Hours: ${STORE.hours}
- Phone/WhatsApp: ${STORE.phoneDisplay}
- Email: ${STORE.email}
- Hallmarked gold & diamond jewellery; bridal, traditional, daily wear
- Live gold rate is shown on the website header (indicative IBJA 22kt metal value; making charges & GST extra)

Personality: polite Indian jewellery-house tone, concise (2–5 short sentences), Hindi-English mix only if the user uses Hindi. Never be pushy. Always finish every sentence — never truncate mid-thought.

Hard rules:
- You do NOT decide whether to email the owner. The server handles that.
- Never claim you already called/emailed the owner unless told in context.
- For window shoppers, be helpful and light — no hard sell.
- Never invent discounts, stock, or exact piece prices.
- If asked something unrelated, gently steer back to jewellery / showroom help.
- Give concrete next steps (visit, WhatsApp, collections) when the user asks how to explore or choose.

Current pipeline step: ${ctx.step}
Intent label: ${ctx.intent.label} (score ${ctx.intent.score}, browseFlags ${ctx.intent.browsingFlags})
Lead so far: ${JSON.stringify(ctx.lead)}
Mode: ${ctx.mode}
${ctx.nextQuestion ? `You MUST naturally include this required question (paraphrase ok, keep meaning): "${ctx.nextQuestion}"` : 'Do NOT ask for interest, occasion, timeline, budget, name, or phone if Lead so far already has that field.'}
Never re-ask for a field that is already filled in Lead so far (especially budget).
`
}

async function callGemini(
  system: string,
  history: ChatTurn[],
  userMessage: string,
): Promise<string | null> {
  const contents: { role: 'user' | 'model'; parts: { text: string }[] }[] = []

  for (const turn of history.slice(-12)) {
    contents.push({
      role: turn.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: turn.content }],
    })
  }
  contents.push({ role: 'user', parts: [{ text: userMessage }] })

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(config.geminiModel)}:generateContent?key=${encodeURIComponent(config.geminiApiKey)}`

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: system }] },
      contents,
      generationConfig: {
        temperature: 0.6,
        // gemini-3.8-flash always thinks; "low" + high cap avoids mid-sentence MAX_TOKENS cuts
        maxOutputTokens: 2048,
        thinkingConfig: { thinkingLevel: 'low' },
      },
    }),
    signal: AbortSignal.timeout(25000),
  })

  if (!res.ok) {
    const errText = await res.text()
    console.error('Gemini error', res.status, errText.slice(0, 400))
    return null
  }

  const data = (await res.json()) as {
    candidates?: {
      finishReason?: string
      content?: { parts?: { text?: string; thought?: boolean }[] }
    }[]
    usageMetadata?: { thoughtsTokenCount?: number; candidatesTokenCount?: number }
  }
  const parts = data.candidates?.[0]?.content?.parts ?? []
  const text = parts
    .filter((p) => !p.thought)
    .map((p) => p.text || '')
    .join('')
    .trim()
  const finish = data.candidates?.[0]?.finishReason
  if (finish && finish !== 'STOP') {
    console.warn(
      'Gemini finishReason',
      finish,
      'len',
      text.length,
      'thoughts',
      data.usageMetadata?.thoughtsTokenCount,
      'cand',
      data.usageMetadata?.candidatesTokenCount,
    )
  }
  // If the model still hit the cap mid-sentence, prefer a clean fallback over a stub
  if (finish === 'MAX_TOKENS' && text.length < 40) return null
  return text || null
}

async function callOpenAI(
  system: string,
  history: ChatTurn[],
  userMessage: string,
): Promise<string | null> {
  const messages = [
    { role: 'system' as const, content: system },
    ...history.slice(-12).map((m) => ({
      role: m.role,
      content: m.content,
    })),
    { role: 'user' as const, content: userMessage },
  ]

  const res = await fetch(`${config.openaiBaseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.openaiApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: config.openaiModel,
      temperature: 0.6,
      max_tokens: 500,
      messages,
    }),
    signal: AbortSignal.timeout(20000),
  })

  if (!res.ok) {
    const errText = await res.text()
    console.error('OpenAI error', res.status, errText.slice(0, 300))
    return null
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[]
  }
  return data.choices?.[0]?.message?.content?.trim() || null
}

export async function generateSunehriReply(input: {
  history: ChatTurn[]
  userMessage: string
  step: FlowStep
  lead: LeadDraft
  intent: IntentState
  nextQuestion?: string
  mode: 'chat' | 'qualify' | 'closing'
  fallback: string
}): Promise<{ text: string; usedLlm: boolean }> {
  const system = systemPrompt({
    step: input.step,
    lead: input.lead,
    intent: input.intent,
    nextQuestion: input.nextQuestion,
    mode: input.mode,
  })

  try {
    let text: string | null = null

    if (config.geminiApiKey) {
      text = await callGemini(system, input.history, input.userMessage)
    } else if (config.openaiApiKey) {
      text = await callOpenAI(system, input.history, input.userMessage)
    } else {
      return { text: input.fallback, usedLlm: false }
    }

    if (!text) return { text: input.fallback, usedLlm: false }
    return { text, usedLlm: true }
  } catch (err) {
    console.error('LLM fetch failed', err)
    return { text: input.fallback, usedLlm: false }
  }
}
