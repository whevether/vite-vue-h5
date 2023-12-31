/**
 * 环境变量 import.meta.env 的类型 （用于智能提示）
 *
 */
interface ImportMetaEnv {
  /**
   * 页面标题
   */
  VITE_GLOB_APP_TITLE: string
  /**
   * 后端api地址
   */
  VITE_APP_BASE_API: string
  /**
   * 路由地址
   */
  VITE_BASE_UR:string
}
