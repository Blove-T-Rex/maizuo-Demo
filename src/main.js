import Vue from 'vue'
import App from './App.vue'
import router from './routers/router.js'
import store from './stores/store.js'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

// 主入口文件，引入模块挂载到实例上
