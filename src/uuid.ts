import { pad } from './pad'

export function uuid() {
  const date = new Date()
  const hexDate = parseInt(
    `${date.getFullYear()}${pad(date.getMonth() + 1, 2)}${pad(
      date.getDate(),
      2
    )}`,
    10
  ).toString(16)
  const hexTime = parseInt(
    `${pad(date.getHours(), 2)}${pad(date.getMinutes(), 2)}${pad(
      date.getSeconds(),
      2
    )}${pad(date.getMilliseconds(), 3)}`,
    10
  ).toString(16)
  let guid = hexDate + hexTime.length + hexTime
  while (guid.length < 32) {
    guid += Math.floor(Math.random() * 16).toString(16)
  }
  return `${guid.slice(0, 8)}-${guid.slice(8, 16)}-${guid.slice(16)}`
}
