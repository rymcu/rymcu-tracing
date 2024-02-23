import { isBrowserEnv, isElectronEnv } from "./is"
import { RYTracing } from "./ry-tracing.types"


export function getGlobal(): Window {
  if (isBrowserEnv || isElectronEnv) return window
  return {} as Window
}

export function getGlobalSupport(): RYTracing {
  _global.__RY_TRACING__ = _global.__RY_TRACING__ || ({} as RYTracing)
  return _global.__RY_TRACING__
}

export function isInit(): boolean {
  return !!_global.__RY_TRACING_INIT__
}

 const _global = getGlobal()
const _support = getGlobalSupport()

export { _global, _support }

