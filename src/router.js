import Vue from 'vue';
import VueRouter from 'vue-router';
import About from './modules/about/containers/About.vue';
import Game from './modules/game/containers/Game.vue';
import Home from './modules/home/containers/Home.vue';
import NotFound from './modules/NotFound/containers/NotFound.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/play', component: Game },
    { path: '/404', component: NotFound },
    { path: '*', redirect: '/404' }
  ]
});

export default router;
