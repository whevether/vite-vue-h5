import type { AxiosResponse } from 'axios'
import request from '@/utils/request'
/**
 *  登录
 * @param data
 * @returns
 */
export function login(data: RecordType): Promise<AxiosResponse<any>> {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}
