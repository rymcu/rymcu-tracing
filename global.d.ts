import { RYTracing } from './src/ry-tracing.types'
declare global {
  interface Window {
    __RY_TRACING__: RYTracing
    __RY_TRACING_INIT__: boolean
  }
}
