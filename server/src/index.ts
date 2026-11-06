import cors from 'cors'
import express from 'express'
import rateLimit from 'express-rate-limit'
import { config, llmStatus } from './config.js'
import { chatRouter } from './routes/chat.js'

const app = express()

app.use(
  cors({
    origin: config.clientOrigins,
    methods: ['GET', 'POST', 'OPTIONS'],
  }),
)
app.use(express.json({ limit: '32kb' }))

app.use(
  '/api/chat',
  rateLimit({
    windowMs: 60_000,
    limit: 40,
    standardHeaders: true,
    legacyHeaders: false,
  }),
)

app.get('/', (_req, res) => {
  res.json({ service: 'blhissaria-sunehri', ok: true })
})

app.get('/api/health', (_req, res) => {
  const llm = llmStatus()
  res.json({
    ok: true,
    llmConfigured: llm.configured,
    provider: llm.provider,
    model: llm.model,
  })
})

app.use('/api/chat', chatRouter)

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

