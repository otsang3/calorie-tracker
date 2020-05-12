import Vue from 'vue'
import App from './App.vue'
import Chart from 'chart.js'

Vue.config.productionTip = false

export const eventBus = new Vue();

new Vue({
  render: h => h(App),
}).$mount('#app')
