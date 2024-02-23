import { isBrowserEnv, isElectronEnv } from "./is"

export function getGlobal(): Window {
    if (isBrowserEnv || isElectronEnv) return window
    return {} as Window
}
