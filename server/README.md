# Sunehri API (B.L. Hissaria)

Secure chat backend for the website assistant.

## Setup

```bash
cd server
cp .env.example .env
# Add GEMINI_API_KEY=AIza...
npm install
npm run dev
```

Runs on `http://localhost:8787`.

## Endpoints

- `GET /api/health` — status + LLM provider/model
- `POST /api/chat` — Sunehri conversation (intent + lead + optional LLM)

Set `GEMINI_API_KEY` for Google Gemini (preferred). `OPENAI_API_KEY` works as fallback.
Without either key, the server still works with rule-based replies.

## Frontend

Vite proxies `/api` → `8787` in development. Start both:

```bash
# terminal 1
npm run dev:server

# terminal 2
npm run dev
```

Or: `npm run dev:all`

## Deploy on Render

Repo includes root `render.yaml`. Easiest path:

1. Open [Render Dashboard → New → Blueprint](https://dashboard.render.com/blueprints) and connect `kshitiz-12/blrhissariamain`
2. Or **New → Web Service** → same repo with:
   - **Root Directory:** `server`
   - **Build Command:** `npm install --include=dev && npm run build`
   - **Start Command:** `npm start`
   - **Health Check Path:** `/api/health`
3. Set environment variables (from your local `server/.env`):

| Key | Example |
|---|---|
| `GEMINI_API_KEY` | your Gemini key |
| `GEMINI_MODEL` | `gemini-3.8-flash` |
| `OWNER_EMAIL` | `skcbsa1221@gmail.com` |
| `OWNER_PHONE` | `+918696200007` |
| `CLIENT_ORIGIN` | your live site URL (e.g. Vercel) |
| `CALLMEBOT_APIKEY` | optional WhatsApp alerts |

4. After deploy, health check: `https://YOUR-SERVICE.onrender.com/api/health`
5. Point the frontend with `VITE_API_URL=https://YOUR-SERVICE.onrender.com` (no trailing slash)

Free tier sleeps after idle — first chat may take ~30–60s to wake.
