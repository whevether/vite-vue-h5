import { viteMockServe } from 'vite-plugin-mock'
import { config } from '../../src/config'
import type { RegisterPluginsParams, VitePlugins } from '../type'

const registerDevPlugins = ({ command }: RegisterPluginsParams): VitePlugins =>
  config.mock
    ? [
        viteMockServe({
          mockPath: 'mock',
          // localEnabled: command === 'serve',
          enable: true,
          watchFiles: true,
          logger: false
        })
      ]
    : []

export default registerDevPlugins
