export default {
  path: '/play',
  component: () =>
    import(
      /* webpackChunkName: "game" */
      './containers/Game.vue'
    )
};
