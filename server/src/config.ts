import 'dotenv/config'

function cleanKey(value: string | undefined) {
  const key = (value || '').trim()
  if (!key || /your-key-here|sk-your|AIza.?your/i.test(key)) return ''
  return key
}

function parseOrigins(): string[] {
  const raw = [
    process.env.CLIENT_ORIGIN,
    process.env.CLIENT_ORIGINS,
    'https://www.blhissaria.com',
    'https://blhissaria.com',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
  ]
    .filter(Boolean)
    .join(',')
  return [...new Set(raw.split(',').map((o) => o.trim()).filter(Boolean))]
}

export const config = {
  port: Number(process.env.PORT || 8787),
  /** Allowed browser origins (comma-separated CLIENT_ORIGINS supported). */
  clientOrigins: parseOrigins(),
  /** Primary site origin — kept for older references. */
  clientOrigin: (process.env.CLIENT_ORIGIN || 'http://localhost:5173').trim(),
  ownerEmail: process.env.OWNER_EMAIL || 'Blhissaria@gmail.com',
  ownerPhone: process.env.OWNER_PHONE || '+918696200007',
  /** CallMeBot WhatsApp API key for OWNER_PHONE (personal alerts). */
  callMeBotApiKey: cleanKey(process.env.CALLMEBOT_APIKEY),
  geminiApiKey: cleanKey(process.env.GEMINI_API_KEY),
  geminiModel: process.env.GEMINI_MODEL || 'gemini-3.8-flash',
  openaiApiKey: cleanKey(process.env.OPENAI_API_KEY),
  openaiModel: process.env.OPENAI_MODEL || 'gpt-4o-mini',
  openaiBaseUrl: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1',
}

export function llmStatus() {
  if (config.geminiApiKey) {
    return { configured: true as const, provider: 'gemini' as const, model: config.geminiModel }
  }
  if (config.openaiApiKey) {
    return { configured: true as const, provider: 'openai' as const, model: config.openaiModel }
  }
  return { configured: false as const, provider: null, model: null }
}

export const STORE = {
  name: 'B.L. Hissaria Jewellers Pvt. Ltd.',
  shortName: 'B.L. Hissaria',
  phoneDisplay: '+91 86962 00007',
  email: 'Blhissaria@gmail.com',
  street: 'Old Market Rd',
  city: 'Hanumangarh',
  region: 'Rajasthan',
  postal: '335513',
  hours: 'Monday–Saturday, 10:00 AM – 8:00 PM',
  mapsUrl:
    'https://www.google.com/maps/place/B.L.+Hissaria+Jewellers+pvt.+Ltd.',
}
