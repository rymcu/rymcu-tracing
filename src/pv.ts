import { getLocationHref } from "./location";
import { _global } from "./global";
import { getTimestamp } from "./time";

export const WEBPAGELOAD: Record<number, string> = {
  0: "navigate",
  1: "reload",
  2: "back_forward",
  255: "reserved",
};

let oldURL = getLocationHref();
let durationStartTime = getTimestamp();
let lastSendObj: any = {};

export function initPV(): void {
  if (_global.__RY_TRACING__.options.disablePV) return;
  let lastIsPop = false;
  let repetitionRoute = false;
  const { eventbus } = _global.__RY_TRACING__;
  sendPageView({ referer: document.referrer });

  eventbus.addEvent({
    type: "history-pushState",
    callback: () => {
      if (repetitionRoute) return;
      lastIsPop = false;
      sendPageView({ action: "navigation" });
    },
  });

  eventbus.addEvent({
    type: "history-replaceState",
    callback: () => {
      repetitionRoute = true;
      lastIsPop = false;
      sendPageView({ action: "navigation" });
      setTimeout(() => {
        repetitionRoute = false;
      }, 100);
    },
  });

  eventbus.addEvent({
    type: "hashchange",
    callback: () => {
      if (repetitionRoute) return;
      if (!lastIsPop) sendPageView();
      lastIsPop = false;
    },
  });

  eventbus.addEvent({
    type: "popstate",
    callback: () => {
      if (repetitionRoute) return;
      if (_global.location.hash !== "") {
        const oldHost =
          oldURL.indexOf("#") > 0
            ? oldURL.slice(0, oldURL.indexOf("#"))
            : oldURL;
        if (
          _global.location.href.slice(0, _global.location.href.indexOf("#")) ===
          oldHost
        )
          return;
      }
      lastIsPop = true;
      sendPageView();
    },
  });

  eventbus.addEvent({
    type: "beforeunload",
    callback: () => {
      const durationTime = getTimestamp() - durationStartTime;
      if (Object.values(lastSendObj).length > 0 && durationTime > 100) {
        sendData.emit({ ...lastSendObj, durationTime }, true);
      }
    },
  });
}

function sendPageView(option: any = {}) {
  const { referer = oldURL, action, params, title } = option;
  let _action = action;
  if (!_action) {
    _action = WEBPAGELOAD[performance.navigation.type] || "";
  }

  setTimeout(
    () => {
      oldURL = getLocationHref();
      const sendObj = {
        eventType: "pv",
        eventId: _global.__RY_TRACING__.base.pageId,
        triggerPageUrl: getLocationHref(),
        referer,
        params,
        title: title || document.title,
        action: _action,
        triggerTime: getTimestamp(),
      };
      sendData.emit(sendObj);

      const durationTime = getTimestamp() - durationStartTime;
      durationStartTime = getTimestamp();
      if (Object.values(lastSendObj).length > 0 && durationTime > 100) {
        sendData.emit({ ...lastSendObj, durationTime });
      }
      lastSendObj = {
        ...sendObj,
        eventType: "pv_duration",
      };
    },
    title ? 0 : 17
  );
}
