import { WIN_CONDITION_STRING } from './constants'

export function checkIfMessageContainsWinningToken(message: string): boolean {
  return message.toLowerCase().includes(WIN_CONDITION_STRING.toLowerCase())
}
