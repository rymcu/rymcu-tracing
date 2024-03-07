import { Base } from "./base";
import { EventBus } from "./eventbus";
import { RYTracingArguments, RYTracingOption } from "./option";

export type RYTracing = {
  base: Base;
  eventbus: EventBus;
  send: (path: string, param: any) => void;
  options: RYTracingOption;
  main: (args: RYTracingArguments) => void;
};
