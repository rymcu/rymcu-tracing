import { cookie } from './cookie'
import { getTimestamp } from './time'
import { UUID } from './uuid'

export function refreshSession(
  sessionKey: string,
  uuid: string,
  expires: number = 30 * 60 * 1000
): string {
  const id = cookie(sessionKey) || `${sessionKey}_${uuid}`
  const expired = new Date(getTimestamp() + expires)
  document.cookie = `${sessionKey}=${id};path=/;max-age=${expires / 1000};expires=${expired.toUTCString()}`
  return id
}

export function sessionID(
  sessionKey: string,
  uuid: string = UUID(),
  expires: number = 30 * 60 * 1000
) {
  return cookie(sessionKey) || refreshSession(sessionKey, uuid, expires)
}
