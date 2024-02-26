export function pad(num: number, len: number, placeholder = '0') {
  const str = String(num)
  if (str.length < len) {
    let result = str
    for (let i = 0; i < len - str.length; i += 1) {
      result = placeholder + result
    }
    return result
  }
  return str
}
