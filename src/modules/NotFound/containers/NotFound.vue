<template>
  <div class="not-found">
    <h1 class="not-found__title">
      404
    </h1>
  </div>
</template>

<style lang="scss" scoped>
  .not-found {
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
