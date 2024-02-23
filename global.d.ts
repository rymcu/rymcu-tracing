import { RYTracing } from "./src/ry-tracing.types";

declare interface Window {
    __RY_TRACING__: RYTracing
}