/** IBJA India gold rates via snapdata (free, no API key, CORS open). */
const SNAPDATA_URL = 'https://snapdata.dev/api/v1/gold/in/latest.json'
/** Spot-derived karat prices (fallback if IBJA feed fails). */
const GOLDPRICE_URL = 'https://api.goldprice.dev/v1/carat?currency=INR'

const CACHE_KEY = 'blh-gold-rate-22k'
const CACHE_TTL_MS = 30 * 60 * 1000 // 30 minutes

export type GoldRateResult = {
  pricePerGram22k: number
  display: string
  source: 'ibja' | 'spot' | 'fallback'
  updatedAt: string
}

const FALLBACK: GoldRateResult = {
  pricePerGram22k: 12800,
  display: '₹12,800.00/g (22kt)',
  source: 'fallback',
  updatedAt: new Date(0).toISOString(),
}

function formatInr(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

function toDisplay(amount: number): string {
  return `${formatInr(amount)}/g (22kt)`
}

function readCache(): GoldRateResult | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as GoldRateResult & { cachedAt: number }
    if (Date.now() - parsed.cachedAt > CACHE_TTL_MS) return null
    return {
      pricePerGram22k: parsed.pricePerGram22k,
      display: parsed.display,
      source: parsed.source,
      updatedAt: parsed.updatedAt,
    }
  } catch {
    return null
  }
}

function writeCache(result: GoldRateResult) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ ...result, cachedAt: Date.now() }))
  } catch {
    /* ignore quota */
  }
}

async function fetchIbja(): Promise<GoldRateResult> {
  const res = await fetch(SNAPDATA_URL, { signal: AbortSignal.timeout(8000) })
  if (!res.ok) throw new Error(`snapdata ${res.status}`)
  const data = await res.json()
  const obs = (data.observations as { instrument: string; value: number | null; date: string }[]).find(
    (o) => o.instrument === 'XAU.22K' && o.value != null,
  )
  if (!obs?.value) throw new Error('no 22k observation')
  return {
    pricePerGram22k: obs.value,
    display: toDisplay(obs.value),
    source: 'ibja',
    updatedAt: data.generated_at ?? obs.date,
  }
}

async function fetchSpot(): Promise<GoldRateResult> {
  const res = await fetch(GOLDPRICE_URL, { signal: AbortSignal.timeout(8000) })
  if (!res.ok) throw new Error(`goldprice ${res.status}`)
  const data = await res.json()
  const price = Number.parseFloat(data.price_gram_22k)
  if (!Number.isFinite(price)) throw new Error('invalid spot 22k')
  return {
    pricePerGram22k: price,
    display: toDisplay(price),
    source: 'spot',
    updatedAt: data.timestamp ?? new Date().toISOString(),
  }
}

/** Fetch live 22kt INR/g rate. Prefers IBJA India, then spot, then cached/static. */
export async function getLiveGoldRate(): Promise<GoldRateResult> {
  const cached = readCache()

  try {
    const ibja = await fetchIbja()
    writeCache(ibja)
    return ibja
  } catch {
    /* try spot */
  }

  try {
    const spot = await fetchSpot()
    writeCache(spot)
    return spot
  } catch {
    /* fall through */
  }

  if (cached) return cached
  return FALLBACK
}
