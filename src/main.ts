import { createApp } from 'vue'

import { createPinia } from 'pinia'
import I18 from '@/languages'

// 全局样式
import '@/styles/index.less'

import router from '@/router'

// 路由守卫，动态路由处理
import '@/router/router-guards'
import App from './App.vue'
import '@/utils/vconsole'

const app = createApp(App)

const store = createPinia()

app.use(router).use(store).use(I18).mount('#app')
