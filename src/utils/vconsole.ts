import { JsBridge } from '@/utils/Jsbridge'
import { config } from '../config'
import { isEnvDevelopment } from './env'
let vConsole = {}
if (isEnvDevelopment && JsBridge('debug') && config.vConsole) {
  import('vconsole').then(({ default: VConsole }) => {
    vConsole = new VConsole({ theme: 'dark' })
  })
}

export default vConsole
