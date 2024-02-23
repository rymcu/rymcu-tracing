function isType(type: any) {
    return function (value: any): boolean {
        return Object.prototype.toString.call(value) === `[object ${type}]`
    }
}

export const isRegExp = isType('RegExp')
export const isNumber = isType('Number')
export const isString = isType('String')
export const isBoolean = isType('Boolean')
export const isNull = isType('Null')
export const isUndefined = isType('Undefined')
export const isSymbol = isType('Symbol')
export const isFunction = isType('Function')
export const isObject = isType('Object')
export const isArray = isType('Array')
export const isProcess = isType('process')
export const isWindow = isType('Window')
export const isFlase = (val: any) => {
    return isBoolean(val) && String(val) === 'false'
}
export const isBrowserEnv = isWindow(typeof window !== 'undefined' ? window : 0)
export const isElectronEnv = !!window?.process?.versions?.electron

export const variableTypeDetection = {
    isNumber: isType('Number'),
    isString: isType('String'),
    isBoolean: isType('Boolean'),
    isNull: isType('Null'),
    isUndefined: isType('Undefined'),
    isSymbol: isType('Symbol'),
    isFunction: isType('Function'),
    isObject: isType('Object'),
    isArray: isType('Array'),
    isProcess: isType('process'),
    isWindow: isType('Window')
}

export function isError(error: Error): boolean {
    switch (Object.prototype.toString.call(error)) {
        case '[object Error]':
            return true
        case '[object Exception]':
            return true
        case '[object DOMException]':
            return true
        default:
            return false
    }
}

export function isEmptyObject(obj: object): boolean {
    return isObject(obj) && Object.keys(obj).length === 0
}

export function isEmpty(wat: any): boolean {
    return (
        (isString(wat) && wat.trim() === '') || wat === undefined || wat === null
    )
}

export function isExistProperty(obj: object, key: string): boolean {
    return Object.prototype.hasOwnProperty.call(obj, key)
}
