import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';

// Add Buefy
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

Vue.use(Buefy);

Vue.config.productionTip = false;

const socket = io('http://192.168.1.107:5000');
Vue.use(VueSocketIOExt, socket);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
