export const WIN_CONDITION_STRING = 'VOITIT_PELIN_TOKEN'
export const WINNING_MESSAGE = 'Okei, puen villapaidan. Voitit pelin!'
export const MAX_CHAT_LENGTH = 20 // 10 messages on each side
export const FAKE_LAG_AFTER_CHAT_LIMIT_HARD_CAP_MS = 1500

/**
 * Gemini exposes an OpenAI-compatible Chat Completions endpoint, so the request
 * and response shapes below are unchanged from the original OpenAI integration.
 * The base must not have a trailing slash.
 */
export const CHAT_COMPLETIONS_URL =
  'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions'

/**
 * Gemini model IDs change often. Confirm the current one against your own key:
 *
 *   curl -s https://generativelanguage.googleapis.com/v1beta/openai/models \
 *     -H "Authorization: Bearer $GEMINI_API_KEY"
 *
 * Pick a Flash-class model (the free-tier workhorse). Override without editing
 * this file by setting NEXT_PUBLIC_CHAT_MODEL. A wrong ID surfaces as a visible
 * error in the chat rather than a silent hang.
 */
export const CHAT_MODEL =
  process.env.NEXT_PUBLIC_CHAT_MODEL || 'gemini-3.5-flash'
