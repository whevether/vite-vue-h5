import type { ConfigEnv, UserConfig } from 'vite'

export interface RegisterPluginsParams {
  env: ImportMetaEnv
  isProd: boolean
  command: ConfigEnv['command']
  pathResolve: (dir: string) => string
}

export type VitePlugins = Exclude<UserConfig['plugins'], undefined>
