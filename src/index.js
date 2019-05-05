import './index.scss';
import Vue from 'vue';
import Notifications from 'vue-notification';
import Root from './Root.vue';
import router from './router';
import store from './store';
import tooltip from './directives/tooltip';

Vue.directive('tooltip', tooltip);
Vue.use(Notifications);

Vue.create = options => new Vue(options);

Vue.create({
  el: '#root',
  render: h => h(Root),
  router,
  store
});
