import { Router } from 'express'
import { z } from 'zod'
import { handleChat } from '../services/chatEngine.js'

const bodySchema = z.object({
  message: z.string().min(1).max(2000),
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string().max(4000),
      }),
    )
    .max(40)
    .optional(),
  lead: z
    .object({
      name: z.string().optional(),
      phone: z.string().optional(),
      interest: z.string().optional(),
      occasion: z.string().optional(),
      timeline: z.string().optional(),
      budget: z.string().optional(),
      notes: z.array(z.string()).default([]),
    })
    .optional(),
  intent: z
    .object({
      score: z.number(),
      browsingFlags: z.number(),
      label: z.enum(['genuine', 'browsing', 'unclear']),
      reasons: z.array(z.string()),
    })
    .optional(),
  step: z
    .enum(['chat', 'interest', 'occasion', 'timeline', 'budget', 'name', 'phone', 'done'])
    .optional(),
  notified: z.boolean().optional(),
})

export const chatRouter = Router()

chatRouter.post('/', async (req, res) => {
  const parsed = bodySchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ error: 'Invalid request', details: parsed.error.flatten() })
    return
  }

  try {
    const result = await handleChat(parsed.data)
    res.json(result)
  } catch (err) {
    console.error('chat failed', err)
    res.status(500).json({ error: 'Chat failed' })
  }
})

chatRouter.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'sunehri' })
})
