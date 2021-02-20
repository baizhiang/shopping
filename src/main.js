import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import el from './plugins/index.js'
import 'lib-flexible'

import animate from 'animate.css'
Vue.use(animate);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
