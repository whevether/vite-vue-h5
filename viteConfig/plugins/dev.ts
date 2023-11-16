import { vitePluginFakeServer } from "vite-plugin-fake-server"
import { config } from '../../src/config'
import type { RegisterPluginsParams, VitePlugins } from '../type'

const registerDevPlugins = ({ command }: RegisterPluginsParams): VitePlugins =>
  config.mock
    ? [
        vitePluginFakeServer({
          logger: false,
          include: "mock",
          infixName: false,
          enableProd: command === "serve"
        }),
      ]
    : []

export default registerDevPlugins
