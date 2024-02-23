import { Base } from './base';
import { RYTracingOption } from './option'

export type RYTracing = {
    event: any;
    base: Base;
    sender: any;
    interseciton: any;
    option: RYTracingOption;
}