import { defineStore } from 'pinia'
import { getStorage, setStorage, removeStorage, UserInfoKey, TokenKey } from '@/utils/cookie'
import router from '@/router'
import { login } from '@/api/login'

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
        router.push('/home')
      } catch (error) {}
    },
    logout() {
      removeStorage([UserInfoKey, TokenKey])
      router.push({ path: '/login', replace: true })
    }
  }
})

export { useUserStore }
