import store from '../../store';

export default {
  path: '/play',
  component: () =>
    import(
      /* webpackChunkName: "game" */
      './containers/Game.vue'
    ),
  beforeEnter: async (_, __, next) => {
    await store.dispatch('game/startGame');

    next();
  }
};
