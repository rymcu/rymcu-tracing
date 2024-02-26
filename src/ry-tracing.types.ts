import { Base } from './base'
import { RYTracingArguments, RYTracingOption } from './option'

export type RYTracing = {
  main: (args: RYTracingArguments) => void
  event: any
  base: Base
  sender: any
  interseciton: any
  option: RYTracingOption
}
