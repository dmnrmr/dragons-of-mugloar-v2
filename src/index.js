import './index.scss';
import Vue from 'vue';
import Root from './Root.vue';
import router from './router';

Vue.create = options => new Vue(options);

Vue.create({
  el: '#root',
  render: h => h(Root),
  router
});
