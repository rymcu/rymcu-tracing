export * from './base'
export * from './cookie'
export * from './fingerprint'
export * from './global'
export * from './ip'
export * from './is'
export * from './option'
export * from './pad'
export * from './ry-tracing.types'
export * from './session'
export * from './time'
export * from './uuid'

import { initBase } from './base'
import { _global } from './global'
import { RYTracingArguments, initOptions } from './option'

export function run(args: RYTracingArguments) {
  if (_global.__RY_TRACING_INIT__) return
  initOptions(args)
  initBase()
  console.log(_global.__RY_TRACING__)
}

_global.__RY_TRACING__.main = run
