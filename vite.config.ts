import { fileURLToPath, URL } from 'url'
import type { UserConfigExport, ConfigEnv, BuildOptions } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import externalGlobals from 'rollup-plugin-external-globals'
import type { RegisterPluginsParams } from './viteConfig'
import { registerPlugins } from './viteConfig'
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
  // 环境变量
  const envParams = { ...env }
  // 打包模式
  const modeEnv = envParams.VITE_USER_NODE_ENV
  const isProd = (modeEnv === 'production')
  // 注册插件(方法)参数
  const options: RegisterPluginsParams = {
    env: envParams,
    isProd,
    command,
    pathResolve
  }
  // 打包配置
  const build = {
    // target: 'es2015',
    outDir: 'dist',
    assetsDir,
    assetsInlineLimit: 2048,
    cssCodeSplit: true,
    brotliSize: false,
    chunkSizeWarningLimit: 2000,
    minify: options.env.envParams,
    rollupOptions: {
      // 忽略打包
      external: [
        'vue',
        'vue-demi',
        'vue-router',
        // 'pinia',
        'vue-i18n',
        'vant',
        // 'xss',
        'crypto-js',
        'dayjs',
        'axios',
        'vconsole'
      ],
      plugins: [
        externalGlobals({
          vue: 'Vue',
          'vue-demi': 'VueDemi',
          'vue-i18n': 'VueI18n',
          'vue-router': 'VueRouter',
          // 'pinia': 'pinia',
          'vant': 'vant',
          'crypto-js': 'CryptoJS',
          'dayjs': 'dayjs',
          'axios': 'axios',
          // 'xss': 'xss',
          'vconsole': 'VConsole'
        }),
      ],
      output: {
        // 静态资源分类和包装
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js", // 主体文件不打hash，避免android环境更新
        assetFileNames: (assetInfo: any) => {
          const _name = assetInfo?.name
          let _assetFileNames = ''
          switch (true) {
            // 媒体文件
            case /\.(png|jpe?g|gif|svg|webp|webm|mp3)$/.test(_name):
              _assetFileNames = `assets/media/[name]-[hash].[ext]`
              break
            // 字体文件
            case /\.(woff|woff2|eot|ttf|otf)$/.test(_name):
              _assetFileNames = `assets/fonts/[name]-[hash].[ext]`
              break
            case /\.(css)$/.test(_name):
              _assetFileNames = `assets/css/[name]-[hash].[ext]`
              break
            default:
              _assetFileNames = `assets/[ext]/[name]-[hash].[ext]`
              break
          }
          return _assetFileNames
        },
        // 静态资源拆分打包
        manualChunks(id) {
          let _manualChunks = ''
          switch (true) {
            case id.includes('node_modules'):
              _manualChunks = 'vendor'
              break
            case id.includes('svg-icons-register'):
              _manualChunks = 'svg-icons-register'
              break
          }
          if (_manualChunks) {
            return _manualChunks
          }
        }
      }
    }
  } as BuildOptions
  // 生产环境去除console
  isProd && build.minify === 'terser' && (build.terserOptions = { compress: { drop_console: true, drop_debugger: true } })

  // 生成程序版本号
  const version = JSON.stringify(`v${pkg.version}`)
  const baseURL = env.VITE_BASE_URL as string
  return defineConfig({
    base: baseURL,
    esbuild: (build.minify === 'esbuild') && isProd && {
      pure: ["console.log", "debugger"]
    },
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
