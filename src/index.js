import './index.scss';
import Vue from 'vue';
import VueSimpleSVG from 'vue-simple-svg';
import Root from './Root.vue';
import router from './router';
import store from './store';

Vue.use(VueSimpleSVG);
Vue.create = options => new Vue(options);

Vue.create({
  el: '#root',
  render: h => h(Root),
  router,
  store
});
