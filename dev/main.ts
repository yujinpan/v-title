import Vue from 'vue';

import App from './src/App.vue';

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  render: (h) => h(App),
});
