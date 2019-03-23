<template>
  <div class="not-found-page">
    <h1 class="not-found-page__title">
      404
    </h1>
    <router-link :to="'/'">
      Go home
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
  .not-found-page {
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &__title {
      font-size: 6em;
      text-transform: uppercase;
    }
  }
</style>

<script>
export default {
  name: 'DmNotFound'
};
</script>
