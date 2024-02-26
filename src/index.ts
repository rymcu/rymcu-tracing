export * from './is'
export * from './fingerprint'
export * from './ip'
export * from './global'
export * from './ry-tracing.types'
export * from './option'

import { _global } from './global'
import { RYTracingArguments } from './option'

export function run(args: RYTracingArguments) {
  console.log(_global.__RY_TRACING__)
  console.log(args)
}

_global.__RY_TRACING__.main = run
