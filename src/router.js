import Vue from 'vue';
import VueRouter from 'vue-router';
import nprogress from 'nprogress';
import home from './modules/Home/routes';
import about from './modules/About/routes';
import game from './modules/Game/routes';
import notFound from './modules/NotFound/routes';

Vue.use(VueRouter);
nprogress.configure({ showSpinner: false });

const router = new VueRouter({
  mode: 'history',
  routes: [
    home,
    about,
    game,
    notFound,
    {
      path: '*',
      redirect: '/404'
    }
  ]
});

router.beforeEach((_, __, next) => {
  nprogress.start();

  next();
});

router.afterEach(() => nprogress.done());

export default router;
