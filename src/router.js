import Vue from 'vue';
import VueRouter from 'vue-router';
import About from './views/pages/About/containers/About.vue';
import Game from './views/pages/Game/containers/Game.vue';
import Home from './views/pages/Home/containers/Home.vue';
import NotFound from './views/pages/NotFound/containers/NotFound.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/play', component: Game },
    { path: '/404', component: NotFound },
    { path: '*', redirect: '/404' }
  ]
});

export default router;
