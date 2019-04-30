import store from '../../store';

export default {
  path: '/play',
  component: () =>
    import(
      /* webpackChunkName: "game" */
      './containers/Game.vue'
    ),
  beforeEnter: (_, __, next) => {
    store.dispatch('game/startGame').then(() => next());
  }
};
