<template>
  <dm-content-layout>
    <div class="content-game">
      <h1 class="content-game__title">
        The game
      </h1>

      <p>Soon™</p>
    </div>
  </dm-content-layout>
</template>

<style lang="scss" scoped>
  .content-game {
    padding: 2rem;

    &__title {
      text-transform: uppercase;
    }
  }
</style>

<script>
import DmContentLayout from '../../../layouts/ContentLayout.vue';

export default {
  name: 'DmGame',
  components: {
    DmContentLayout
  }
};
</script>
