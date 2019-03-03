import Vue from 'vue';
import VueRouter from 'vue-router';
import About from './modules/about/containers/About.vue';
import Game from './modules/game/containers/Game.vue';
import Home from './modules/home/containers/Home.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/game', component: Game }
  ]
});

export default router;
