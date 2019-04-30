export default {
  path: '/about',
  component: () =>
    import(
      /* webpackChunkName: "about" */
      './containers/About.vue'
    )
};
