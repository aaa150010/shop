import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)


import router from './router'
app.use(router)

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)

import * as icons from '@element-plus/icons-vue'
Object.keys(icons).forEach(key => {
    app.component(key, icons[key])
})

import 'virtual:windi.css'
import 'nprogress/nprogress.css'

app.mount('#app')