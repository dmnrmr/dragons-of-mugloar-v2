import Vue from 'vue';
import App from './App.vue';

Vue.create = options => new Vue(options);

Vue.create({
  el: '#app',
  render: h => h(App)
});
