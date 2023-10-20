/**
 * 用户状态类型
 */
declare interface UserStoreState {
  token?: string
  userInfo: any
}

declare type UserInfo = UserStoreState['userInfo']
