import Vue from 'vue'
import App from './App.vue'
import Tooltip from 'vue-directive-tooltip';
Vue.use(Tooltip);
new Vue({
  el: '#app',
  render: h => h(App)
})
