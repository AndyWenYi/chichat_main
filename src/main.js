import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import VModal from 'vue-js-modal'

Vue.component('v-select', vSelect)
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VModal)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
