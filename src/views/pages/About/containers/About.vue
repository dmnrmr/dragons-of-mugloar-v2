<template>
  <dm-content-layout>
    <div class="content-about">
      <h1 class="content-about__title">
        About the game
      </h1>
    </div>
  </dm-content-layout>
</template>

<style lang="scss" scoped>
  .content-about {
    padding: 1rem;

    &__title {
      text-transform: uppercase;
    }
  }
</style>

<script>
import DmContentLayout from '../../../layouts/ContentLayout.vue';

export default {
  name: 'DmHome',
  components: {
    DmContentLayout
  }
};
</script>
