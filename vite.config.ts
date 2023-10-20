import { fileURLToPath, URL } from 'url'
import type { UserConfigExport, ConfigEnv, BuildOptions } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import type { RegisterPluginsParams } from './viteConfig'
import { registerPlugins, manualChunks } from './viteConfig'
import pkg from './package.json'

export const pathResolve = (dir: string): string => fileURLToPath(new URL(dir, import.meta.url))

/**
 * 静态文件目录
 */
const assetsDir = 'assets'

// https://vitejs.dev/config/
const config = ({ command, mode }: ConfigEnv): UserConfigExport => {
  // 环境变量
  const env = loadEnv(mode, process.cwd()) as unknown as RegisterPluginsParams['env']
  // 打包模式
  const modeEnv = process.env.VITE_USER_NODE_ENV;
  const isProd = (modeEnv === 'production' || modeEnv === 'android' || modeEnv === 'ios')
  // 环境变量
  const envParams = { ...env }

  // 注册插件(方法)参数
  const options: RegisterPluginsParams = {
    env: envParams,
    isProd,
    command,
    pathResolve
  }

  // 打包配置
  const build = {
    target: 'es2015',
    outDir: 'dist',
    assetsDir,
    assetsInlineLimit: 2048,
    cssCodeSplit: true,
    brotliSize: false,
    chunkSizeWarningLimit: 2000,
    minify: (modeEnv === 'production') ? 'terser' : 'esbuild',
    rollupOptions: {
      output: { manualChunks }
    }
  } as BuildOptions

  // 生产环境去除console
  isProd && (build.terserOptions = { compress: { drop_console: true } })

  // 生成程序版本号
  const version = JSON.stringify(`v${pkg.version}`)
  const baseURL = env.VITE_BASE_URL as string
  return defineConfig({
    base: baseURL,
    plugins: registerPlugins(options),
    define: {
      __APP_VERSION__: version
    },
    server: {
      port: 8374,
      strictPort: true,
      open: false
    },
    resolve: {
      alias: [{ find: '@/', replacement: pathResolve('src') + '/' }]
    },
    build,
    css: {
      preprocessorOptions: {
        less: {
          // 自动导入scss变量，可在任意文件内访问，无需导入
          additionalData: `@import "src/styles/variables.module.less";`
        }
      }
    }
  })
}

export default config
