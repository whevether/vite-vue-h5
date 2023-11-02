import { defineStore } from 'pinia'
import { getStorage, setStorage, removeStorage, UserInfoKey, TokenKey } from '@/utils/cookie'
import { login, logout } from '@/api/login'

const useUserStore = defineStore('user', {
  state: (): UserStoreState => {
    return {
      token: getStorage(TokenKey),
      userInfo: JSON.parse(getStorage(UserInfoKey) ?? '{}')
    }
  },
  getters: {
    isLogin: state => !!state.token
  },
  actions: {
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo
    },
    setToken(token: string) {
      this.token = token
    },
    async login(userForm: UserInfo) {
      try {
        const { data } = await login(userForm)
        setStorage(TokenKey, data?.token)
        setStorage(UserInfoKey, JSON.stringify(data?.userInfo))
        this.setToken(data.token)
        this.setUserInfo(data.userInfo)
      } catch (error) {}
    },
    async logout() {
      try {
        await logout()
      } catch (error) {}
      removeStorage([UserInfoKey, TokenKey])
    }
  }
})

export { useUserStore }
