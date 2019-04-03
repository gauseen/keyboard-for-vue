import Vue from 'vue'
import App from './App.vue'
import router from './router'
// const KeyboardForVue = require('../dist/keyboardForVue.umd')
import KeyboardForVue from '@gauseen/keyboard-for-vue'
// import { keyboardForVue } from '@/components/keyboard'

console.log(KeyboardForVue)
Vue.config.productionTip = false

Vue.use(KeyboardForVue)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
