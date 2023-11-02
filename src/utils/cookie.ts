import type { CookieAttributes } from 'js-cookie'
import Cookies from 'js-cookie'

export const TokenKey = 'Token'

export const UserInfoKey = 'User-Info'
/**
 * 获取缓存
 * @returns 缓存
 */
export function getStorage(name: string): string | undefined {
  return Cookies.get(name)
}

/**
 * 设置缓存
 * @returns 返回缓存
 */
export function setStorage(
  name: string,
  value: string,
  option?: any | CookieAttributes
): string | undefined {
  return Cookies.set(name, value, option)
}

/**
 * 移除token
 */
export function removeStorage(arr: string[], option?: any | CookieAttributes): void {
  for (const name of arr) {
    Cookies.remove(name, option)
  }
}
