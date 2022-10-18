import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store/modules/index';
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false
Vue.use(Vuelidate);
new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
