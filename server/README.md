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
