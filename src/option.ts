export interface RYTracingArguments {
  dsn: string
  appName: string
  appCode: string
  appVersion: string
  userUuid: string
  sdkUserUuid: string
  debug: boolean
  pv: boolean
  performance: boolean
  error: boolean
  event: boolean
  tracesSampleRate: number
  cacheMaxLength: number
  cacheWatingTime: number
  ignoreErrors: Array<string | RegExp>
  ignoreRequest: Array<string | RegExp>
  extra: any
}

export class RYTracingOption implements RYTracingArguments {
  dsn: string = ''
  appName: string = ''
  appCode: string = ''
  appVersion: string = '1.0.0'
  userUuid: string = ''
  sdkUserUuid: string = ''
  debug: boolean = false
  pv: boolean = false
  performance: boolean = false
  error: boolean = false
  event: boolean = false
  tracesSampleRate: number = 1
  cacheMaxLength: number = 5
  cacheWatingTime: number = 5000
  ignoreErrors: (string | RegExp)[] = []
  ignoreRequest: (string | RegExp)[] = []
  extra: any = {}
}
