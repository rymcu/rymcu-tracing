import { getLocationHref } from "./location";
import { _global } from "./global";
import { getTimestamp } from "./time";

let oldURL = getLocationHref();
let durationStartTime = getTimestamp();
let lastSendObj: any = {};

export function initPV(): void {
  if (_global.__RY_TRACING__.options.disablePV) return;
  // 最后一次触发路由变化是否为popState触发
  let lastIsPop = false;
  // 在触发 replaceState 后 100ms 内的 pushState 会被无效记录
  let repetitionRoute = false;
  const { eventbus } = _global.__RY_TRACING__;
  // 首次进入记录url变化
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
          oldURL.indexOf("#") > 0 // 多页面情况下 history模式刷新还是在pv页面
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
