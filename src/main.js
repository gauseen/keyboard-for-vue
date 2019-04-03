import Vue from 'vue'
import App from './App.vue'
import router from './router'
import KeyboardForVue from '@/components/keyboard'

Vue.config.productionTip = false

Vue.use(KeyboardForVue)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
