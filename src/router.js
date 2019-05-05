import Vue from 'vue';
import VueRouter from 'vue-router';
import nprogress from 'nprogress';
import store from './store';
import home from './modules/Home/routes';
import about from './modules/About/routes';
import game from './modules/Game/routes';
import notFound from './modules/NotFound/routes';
import gameOver from './modules/GameOver/routes';

Vue.use(VueRouter);
nprogress.configure({ showSpinner: false });

const router = new VueRouter({
  mode: 'history',
  routes: [
    home,
    about,
    game,
    notFound,
    gameOver,
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

store.subscribe(({ type }) => {
  if (type === 'game/GAME_OVER') {
    router.push('/game-over');
  }
});

export default router;
