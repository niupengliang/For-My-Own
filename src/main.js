import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入reset.css
import "@/assets/css/reset.css"

// 引入iconfont.css
import "@/assets/fonts/iconfont.css"
// import "./assets/fonts/iconfont.css"


// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 中央事件总线bus
Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
