import { _global } from "./global";

export function send(path: string, param: any): void {
  const base = _global.__RY_TRACING__.base;
  const options = _global.__RY_TRACING__.options;
  _global.navigator.sendBeacon(
    options.dsn + path,
    JSON.stringify({
      appName: options.appName,
      appCode: options.appCode,
      appVersion: options.appVersion,
      userID: options.userID,
      sdkID: options.sdkID,
      clientHeight: base.clientHeight,
      clientWidth: base.clientWidth,
      colorDepth: base.colorDepth,
      pixelDepth: base.pixelDepth,
      screenWidth: base.screenWidth,
      screenHeight: base.screenHeight,
      fingerPrint: base.fingerPrint,
      ua: base.ua,
      ip: base.ip,
      session: base.session,

      ...param,
    })
  );
}

export function initSender(): void {
  _global.__RY_TRACING__.send = send;
}
