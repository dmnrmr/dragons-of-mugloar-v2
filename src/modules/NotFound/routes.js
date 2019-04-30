export default {
  path: '/404',
  component: () =>
    import(
      /* webpackChunkName: "not-found" */
      './containers/NotFound.vue'
    )
};
