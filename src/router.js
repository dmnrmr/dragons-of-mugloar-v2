import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () =>
        import(
          /* webpackChunkName: "home" */
          './modules/Home/containers/Home.vue'
        )
    },
    {
      path: '/about',
      component: () =>
        import(
          /* webpackChunkName: "about" */
          './modules/About/containers/About.vue'
        )
    },
    {
      path: '/play',
      component: () =>
        import(
          /* webpackChunkName: "game" */
          './modules/Game/containers/Game.vue'
        )
    },
    {
      path: '/404',
      component: () =>
        import(
          /* webpackChunkName: "not-found" */
          './modules/NotFound/containers/NotFound.vue'
        )
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
});

export default router;
