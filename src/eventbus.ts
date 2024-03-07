import { _global } from "./global";

export interface EventHandler {
  type: string;
  callback: (...args: any[]) => any;
}

export type Handlers = {
  [key: string]: ((...args: any[]) => any)[];
};

export class EventBus {
  private handlers: Handlers;

  constructor() {
    this.handlers = {};
  }

  addEvent(handler: EventHandler) {
    const { type } = handler;
    if (!this.handlers[type]) this.handlers[type] = [];
    const funIndex = this.getCallbackIndex(handler);
    if (funIndex === -1) {
      this.handlers[handler.type]?.push(handler.callback);
    }
  }

  delEvent(handler: EventHandler) {
    const funIndex = this.getCallbackIndex(handler);
    if (funIndex !== -1) {
      this.handlers[handler.type]?.splice(funIndex, 1);
    }
  }

  changeEvent(handler: EventHandler, newCallback: (...args: any[]) => any) {
    const funIndex = this.getCallbackIndex(handler);
    if (funIndex !== -1) {
      this.handlers[handler.type]?.splice(funIndex, 1, newCallback);
    }
  }

  getEvent(type: string): ((...args: any[]) => any)[] {
    return this.handlers[type] || [];
  }

  runEvent(type: string, ...args: any[]): void {
    const allEvent = this.getEvent(type);
    allEvent.forEach((fun) => {
      fun(...args);
    });
  }

  getCallbackIndex(handler: EventHandler): number {
    if (this.handlers[handler.type]) {
      const callbackList = this.handlers[handler.type];
      if (callbackList) {
        return callbackList.findIndex((fun) => fun === handler.callback);
      } else {
        return -1;
      }
    } else {
      return -1;
    }
  }
}

export function initEventBus() {
  _global.__RY_TRACING__.eventbus = new EventBus();
}
