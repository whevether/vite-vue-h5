import { defineFakeRoute } from "vite-plugin-fake-server/client"
// 登录
export default defineFakeRoute({
  url: '/api/login',
  method: 'post',
  response: () => {
    return {
      code: 200,
      success: true,
      message: '登录成功',
      data: {
        token: 'fsa45f4563f4a6f4-fsa45f4563f4a6f4-fsa45f4563f4a6f4',
        userInfo: {
          username: 'admin',
          id: 1,
          sex: '男',
          phone:'15575867159',
          email: 'whevether@qq.com'
        }
      }
    }
  }
})
