import { _global } from './global'
import { load } from './fingerprint'
import { getIPs } from './ip'
import { getGlobal } from './global'
import { cookie } from './cookie'
import { UUID } from './uuid'
import { sessionID } from './session'
import { UAParser } from 'ua-parser-js'

export interface BaseInterface {
  clientHeight?: number
  clientWidth?: number
  colorDepth?: number
  pixelDepth?: number
  screenWidth?: number
  screenHeight?: number
  fingerPrint?: string
  ua?: string
  ip?: string
  session?: string
}

export class Base implements BaseInterface {
  clientHeight?: number
  clientWidth?: number
  colorDepth?: number
  pixelDepth?: number
  screenWidth?: number
  screenHeight?: number
  fingerPrint?: string
  ua?: string
  ip?: string
  session?: string

  constructor() {
    this.initFingerprint()
    this.initIP()
    this.initDevice()
    this.initDeviceCookie()
    this.initSession()
    this.initUA()
  }

  initFingerprint(): void {
    load({})
      .then((fp: any) => fp.get())
      .then((result: any) => {
        this.fingerPrint = result.visitorId
      })
  }

  initIP(): void {
    getIPs().then((res: any) => {
      this.ip = res[0]
    })
  }

  initDevice(): void {
    const { screen } = getGlobal()
    const { clientWidth, clientHeight } = document.documentElement
    const { width, height, colorDepth, pixelDepth } = screen
    this.clientHeight = clientHeight
    this.clientWidth = clientWidth
    this.screenWidth = width
    this.screenHeight = height
    this.colorDepth = colorDepth
    this.pixelDepth = pixelDepth
  }

  initDeviceCookie(): void {
    const { options } = _global.__RY_TRACING__
    let deviceID = cookie(options.deviceKey)
    if (!deviceID) {
      deviceID = UUID()
      document.cookie = `${options.deviceKey}=${deviceID};path=/;`
    }
  }

  initSession(): void {
    const { options } = _global.__RY_TRACING__
    this.session = sessionID(options.sessionKey, UUID(), options.sessionExpires)
  }

  initUA(): void {
    this.ua = UAParser().ua
  }
}

export function initBase(): void {
  _global.__RY_TRACING__.base = new Base()
}
