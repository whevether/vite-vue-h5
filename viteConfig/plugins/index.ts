import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { viteVConsole } from 'vite-plugin-vconsole'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import DefineOptions from 'unplugin-vue-define-options/vite'
import type { RegisterPluginsParams, VitePlugins } from '../type'
import registerDevPlugins from './dev'
import registerProdPlugins from './prod'
import path from 'path'

/**
 *  注册插件
 * @param options
 * @returns
 */
export default function registerPlugins(options: RegisterPluginsParams): VitePlugins {
  const { env, pathResolve, isProd } = options
  // vite插件
  let plugins: VitePlugins = [
    vue(),
    // defineOptions 宏
    DefineOptions(),
    (env.VITE_USER_NODE_ENV === 'android') && viteVConsole({
      entry: [path.resolve('src/main.ts')], // entry file
      localEnabled: true, // 本地是否启用
      enabled: true, // 是否启用
      config: { // vconsole options
        maxLogNumber: 1000,
        theme: 'dark'
      }
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [pathResolve('src/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[name]'
    }),
    vueJsx(),
    AutoImport({
      dts: './src/auto-imports.d.ts',
      // 这里除了引入 vue 以外还可以引入pinia、vue-router、vueuse等，
      // 甚至你还可以使用自定义的配置规则，见 https://github.com/antfu/unplugin-auto-import#configuration
      imports: ['vue', 'pinia', 'vue-router'],
      // Generate corresponding .eslintrc-auto-import.json file.
      // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './src/.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      }
    }),
    Components({
      dts: './src/components.d.ts',
      // dirs 指定组件所在位置，默认为 src/components
      // 可以让我们使用自己定义组件的时候免去 import 的麻烦
      dirs: [path.resolve(__dirname, 'components')],
      // 配置需要将哪些后缀类型的文件进行自动按需引入
      extensions: ['vue', 'md'],
      // ui库解析器，也可以自定义
      resolvers: [
        VantResolver(),
      ],
      // 允许子目录作为组件的命名空间前缀。
      directoryAsNamespace: true
    }),
  ]

  plugins = isProd
    ? [...plugins, ...registerProdPlugins(options)]
    : [...plugins, ...registerDevPlugins(options)]

  return plugins
}
