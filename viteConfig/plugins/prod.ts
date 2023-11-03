/* eslint-disable @typescript-eslint/no-unused-vars */
import viteCompression from 'vite-plugin-compression2'
import { visualizer } from 'rollup-plugin-visualizer'
import legacy from '@vitejs/plugin-legacy'
import { Plugin as importToCDN } from 'vite-plugin-cdn-import'
import banner from 'vite-plugin-banner'
import type { VitePlugins, RegisterPluginsParams } from '../type'
import pkg from '../../package.json'

const registerProdPlugins = (option: RegisterPluginsParams): VitePlugins => {
  const plugins: VitePlugins = [
    legacy({
      modernPolyfills: true, //开启将会超包警告
      // 需要兼容的目标列表，可以设置多个
      targets: [
        "Android > 39",
        "Chrome >= 52",
        "Safari >= 10.1",
        "iOS >= 10.3",
        "Firefox >= 54",
        "Edge >= 15"
      ],
      // targets: ['chrome 52'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      renderLegacyChunks: true,
      polyfills: [
        'es.symbol',
        'es.array.filter',
        'es.promise',
        'es.promise.finally',
        'es/map',
        'es/set',
        'es.array.for-each',
        'es.object.define-properties',
        'es.object.define-property',
        'es.object.get-own-property-descriptor',
        'es.object.get-own-property-descriptors',
        'es.object.keys',
        'es.object.to-string',
        'web.dom-collections.for-each',
        'esnext.global-this',
        'esnext.string.match-all'
      ]
    }),
    // gzip插件
    (option.env.VITE_BUILD_GZIP === 'true' && option.isProd) && viteCompression({
      include: /\.(js|css)$/i,
      exclude: [/\.(br)$/, /\.(gz)$/],
      threshold: 10240,
      algorithm: "gzip",
      deleteOriginalAssets: true
      // ext: ".gz",
    }),
    (option.env.VITE_CDN === 'true') && importToCDN({
      // （prodUrl解释： name: 对应下面modules的name，version: 自动读取本地package.json中dependencies依赖中对应包的版本号，path: 对应下面modules的path，当然也可写完整路径，会替换prodUrl）
      prodUrl: `${option.env.VITE_CDN_PATH}/{name}/{path}`,
      // prodUrl: "https://unpkg.com/{name}/{version}/{path}",
      modules: [
        {
          name: "vue",
          var: "Vue",
          path: "vue.global.prod.min.js"
        },
        {
          name: "vue-router",
          var: "VueRouter",
          path: "vue-router.global.prod.min.js"
        },
        {
          name: "vue-i18n",
          var: "VueI18n",
          path: "vue-i18n.runtime.global.prod.min.js"
        },
        {
          name: "vue-demi",
          var: "VueDemi",
          path: "index.iife.min.js"
        },
        // {
        //   name: "pinia",
        //   var: "Pinia",
        //   path: "pinia.iife.prod.min.js"
        // },
        // 使用cdn引入vant时,开发环境还是需要在main.js中引入vant,可以不用引入css
        {
          name: 'vant',
          var: 'vant',
          path: 'lib/vant.min.js',
          css: 'lib/index.min.css'
        },
        {
          name: "axios",
          var: "axios",
          path: "axios.min.js"
        },
        {
          name: "dayjs",
          var: "dayjs",
          path: "dayjs.min.js"
        },
        {
          name: "crypto-js",
          var: "CryptoJS",
          path: "crypto-js.min.js"
        },
        // {
        //   name: "xss",
        //   var: "xss",
        //   path: "xss.min.js"
        // }
        {
          name: "vconsole",
          var: "VConsole",
          path: "vconsole.min.js"
        }
      ]
    }),
    // 添加版权注释
    banner({
      content: `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * description: ${pkg.description}\n * author: ${pkg.author}\n * copyright: ${pkg.copyright}\n */`
    })
  ]
  //  包分析插件
  if (option.env.VITE_REPORT === 'true') {
    plugins.push(
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true
      })
    )
  }

  return plugins
}

export default registerProdPlugins
