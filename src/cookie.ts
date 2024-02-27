export function cookie(name: string) {
  const result = document.cookie.match(new RegExp(`${name}=([^;]+)(;|$)`))
  return result ? result[1] : undefined
}
