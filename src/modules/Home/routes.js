export default {
  path: '/',
  component: () =>
    import(
      /* webpackChunkName: "home" */
      './containers/Home.vue'
    )
};
