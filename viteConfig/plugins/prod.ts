/* eslint-disable @typescript-eslint/no-unused-vars */
import viteCompression from 'vite-plugin-compression2'
import { visualizer } from 'rollup-plugin-visualizer'
import legacy from '@vitejs/plugin-legacy'
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
      filter: /\.(js|css)$/i,
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: "gzip",
      // ext: ".gz",
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
