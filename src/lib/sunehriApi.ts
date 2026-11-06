export type FlowStep =
  | 'chat'
  | 'interest'
  | 'occasion'
  | 'timeline'
  | 'budget'
  | 'name'
  | 'phone'
  | 'done'

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
  label: 'genuine' | 'browsing' | 'unclear'
  reasons: string[]
}

export type ChatTurn = { role: 'user' | 'assistant'; content: string }

export type ChatResponse = {
  reply: string
  lead: LeadDraft
  intent: IntentState
  step: FlowStep
  notified: boolean
  notifyReason?: string
  usedLlm: boolean
}

const API_BASE = import.meta.env.VITE_API_URL || ''

export async function sendSunehriMessage(payload: {
  message: string
  history: ChatTurn[]
  lead: LeadDraft
  intent: IntentState
  step: FlowStep
  notified: boolean
}): Promise<ChatResponse> {
  const res = await fetch(`${API_BASE}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(err || `Chat API ${res.status}`)
  }

  return res.json() as Promise<ChatResponse>
}

export function emptyLead(): LeadDraft {
  return { notes: [] }
}

export function emptyIntent(): IntentState {
  return { score: 0, browsingFlags: 0, label: 'unclear', reasons: [] }
}
