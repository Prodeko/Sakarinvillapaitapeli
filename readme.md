# Sakarin villapaitapeli

A Finnish-language persuasion game: talk Sakari into putting on a wool sweater.
Next.js App Router app, backed by a chat model.

## Running locally

```bash
npm ci
cp .env.example .env.local   # then fill in GEMINI_API_KEY
npm run dev
```

Open http://localhost:3000.

### Getting a key

The game runs on the **Google Gemini free tier** — no credit card. Create a key at
[Google AI Studio](https://aistudio.google.com/apikey) and put it in `.env.local` as
`GEMINI_API_KEY`.

Free-tier limits are roughly **1,500 requests/day at 15 requests/minute**, which is
fine for playtesting but can throttle if a whole room plays at once.

### Choosing the model

`CHAT_MODEL` in `utils/constants.ts` holds the model ID. Gemini's model names change
often, so confirm what your key can actually reach before trusting the default:

```bash
curl -s https://generativelanguage.googleapis.com/v1beta/openai/models \
  -H "Authorization: Bearer $GEMINI_API_KEY"
```

Pick a **Flash**-class model. You can override the default without editing code by
setting `NEXT_PUBLIC_CHAT_MODEL`. A wrong model ID shows up as a visible error in the
chat, not a hang.

## How it talks to Gemini

Gemini exposes an OpenAI-compatible Chat Completions endpoint, so the original
request/response handling is unchanged — only the base URL, the key, and the model ID
differ. The browser posts to `/api/chat` (`app/api/chat/route.ts`), which attaches the
key server-side and forwards to:

```
https://generativelanguage.googleapis.com/v1beta/openai/chat/completions
```

## Deploying on Vercel (free tier)

1. Import the repo — the Next.js preset is detected automatically, no `vercel.json` needed.
2. Add `GEMINI_API_KEY` under Project Settings → Environment Variables, for all environments.
3. Deploy.

Hobby-plan function timeouts are not a concern; a Flash model answers a short turn in
a couple of seconds.

## Known limitations

`app/api/chat/route.ts` forwards the request body to Gemini as-is, which means the
client chooses the model and the system prompt, and the game prompt (including the
win token) ships in the browser bundle. Consequences:

- A public URL is effectively an open proxy against your quota. On the free tier the
  worst case is a burned daily quota rather than a bill.
- A determined player can read the winning conditions out of the JS bundle, or post
  the win token directly.

Fine for a small or private game. Before putting the URL in front of a crowd, build
the request server-side in the route handler instead: ignore the client's `model` and
`system` fields, accept only the user messages, and cap message count and length.

## Notes for future work

The system prompt in `common/prompts.ts` was originally tuned against `gpt-3.5-turbo`.
Modern models follow instructions much more closely, which makes the game harder and
changes how reliably the win token is emitted — expect to retune the prompt and
playtest all four win paths.
