import { Router } from 'express'
import { z } from 'zod'
import { sendContactEmail } from '../services/notify.js'

const bodySchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional(),
  enquiry: z.string().trim().min(1).max(80),
  message: z.string().trim().min(1).max(4000),
})

export const contactRouter = Router()

contactRouter.post('/', async (req, res) => {
  const parsed = bodySchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ error: 'Invalid request', details: parsed.error.flatten() })
    return
  }

  try {
    await sendContactEmail({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || undefined,
      enquiry: parsed.data.enquiry,
      message: parsed.data.message,
    })
    res.json({ ok: true })
  } catch (err) {
    console.error('contact email failed', err)
    res.status(502).json({ error: 'Could not send message' })
  }
})
