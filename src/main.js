import Vue from 'vue'
import App from './App.vue'

// 引入公共样式表
import '@/assets/css/global.css'

// 导入路由实例
import router from './router'

// 引入 element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
