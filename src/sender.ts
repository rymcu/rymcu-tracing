import { _global } from "./global";

export class Sender {}

export function initSender(): void {
  _global.__RY_TRACING__.sender = new Sender();
}
