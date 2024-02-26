import { _global } from './global'

export interface BaseInterface {
  clientHeight?: number
  clientWidth?: number
  colorDepth?: number
  pixelDepth?: number
  screenWidth?: number
  screenHeight?: number
  deviceId?: string
  platform?: string
  ua?: string
  ip?: string
}

export class Base implements BaseInterface {
  clientHeight?: number
  clientWidth?: number
  colorDepth?: number
  pixelDepth?: number
  screenWidth?: number
  screenHeight?: number
  deviceId?: string
  platform?: string
  ua?: string
  ip?: string

  constructor() {}
}

export function initBase(): void {
  _global.__RY_TRACING__.base = new Base()
}
