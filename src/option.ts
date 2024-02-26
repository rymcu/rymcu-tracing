import { _global } from './global'

export interface RYTracingArguments {
  dsn: string
  appName: string
  appCode: string
  appVersion: string
  userID: string
  sdkID: string
  debug: boolean
  disablePV: boolean
  disablePerformance: boolean
  disableError: boolean
  disableEvent: boolean
  tracesSampleRate: number
  cacheMaxLength: number
  cacheWatingTime: number
  ignoreErrors: Array<string | RegExp>
  ignoreRequest: Array<string | RegExp>
  extra: any
  deviceKey: string
  seesionKey: string
  sessionExpires: number
  sdkLocalKey: string
  name: string
  repository: string
  version: string
}

export class RYTracingOption implements RYTracingArguments {
  dsn: string = 'https://rymcu.com/tracing'
  appName: string = ''
  appCode: string = ''
  appVersion: string = ''
  userID: string = ''
  sdkID: string = ''
  debug: boolean = false
  disablePV: boolean = false
  disablePerformance: boolean = false
  disableError: boolean = false
  disableEvent: boolean = false
  tracesSampleRate: number = 1
  cacheMaxLength: number = 5
  cacheWatingTime: number = 5000
  ignoreErrors: (string | RegExp)[] = []
  ignoreRequest: (string | RegExp)[] = []
  extra: any = {}
  deviceKey: string = ''
  seesionKey: string = 'rytracing_'
  sessionExpires: number = 30 * 60 * 1000
  sdkLocalKey: string = ''
  readonly name: string = '{{PACKAGE_NAME}}'
  readonly repository: string = '{{PACKAGE_REPOSITORY}}'
  readonly version: string = '{{PACKAGE_VERSION}}'
  constructor(args: Partial<RYTracingArguments>) {
    Object.assign(this, args)
  }
}

export function initOptions(args: Partial<RYTracingArguments>) {
  _global.__RY_TRACING__.options = new RYTracingOption(args)
}
