export default {
  path: '/game-over',
  component: () =>
    import(
      /* webpackChunkName: "game-over" */
      './containers/GameOver.vue'
    )
};
