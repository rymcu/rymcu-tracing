import { Base } from './base'
import { RYTracingArguments, RYTracingOption } from './option'

export type RYTracing = {
  base: Base
  event: any
  sender: any
  interseciton: any
  options: RYTracingOption
  main: (args: RYTracingArguments) => void
}
