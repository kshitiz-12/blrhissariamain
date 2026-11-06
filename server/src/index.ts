import cors from 'cors'
import express from 'express'
import rateLimit from 'express-rate-limit'
import { config, llmStatus } from './config.js'
import { mailStatus } from './services/mail.js'
import { chatRouter } from './routes/chat.js'
import { contactRouter } from './routes/contact.js'

const app = express()

app.use(
  cors({
    origin: config.clientOrigins,
    methods: ['GET', 'POST', 'OPTIONS'],
  }),
)
app.use(express.json({ limit: '32kb' }))

const apiLimiter = rateLimit({
  windowMs: 60_000,
  limit: 40,
  standardHeaders: true,
  legacyHeaders: false,
})
app.use('/api/chat', apiLimiter)
app.use('/api/contact', apiLimiter)

app.get('/', (_req, res) => {
  res.json({ service: 'blhissaria-sunehri', ok: true })
})

app.get('/api/health', (_req, res) => {
  const llm = llmStatus()
  const mail = mailStatus()
  res.json({
    ok: true,
    llmConfigured: llm.configured,
    provider: llm.provider,
    model: llm.model,
    smtpConfigured: mail.smtpConfigured,
    ownerEmail: mail.ownerEmail,
  })
})

app.use('/api/chat', chatRouter)
app.use('/api/contact', contactRouter)

app.listen(config.port, '0.0.0.0', () => {
  const llm = llmStatus()
  console.log(`Sunehri API listening on 0.0.0.0:${config.port}`)
  console.log(`CORS origins: ${config.clientOrigins.join(', ')}`)
  console.log(
    llm.configured
      ? `LLM: enabled (${llm.provider} / ${llm.model})`
      : 'LLM: disabled — rule fallback (set GEMINI_API_KEY)',
  )
})

