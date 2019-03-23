<template>
  <div class="home-page">
    <h1 class="home-page__title">
      Dragons of Mugloar 2
    </h1>

    <nav class="home-page__navigation">
      <dm-anchor-button class="home-page__navigation-item" :text="'Play game'" :to="'/play'" />

      <dm-anchor-button class="home-page__navigation-item" :text="'About the game'" :to="'/about'" />
    </nav>
  </div>
</template>

<style lang="scss" scoped>
  .home-page {
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &__title {
      font-size: 6em;
      text-transform: uppercase;
    }

    &__navigation-item {
      margin-right: 2rem;

      &:last-child {
        margin-right: 0;
      }
    }
  }
</style>

<script>
import DmAnchorButton from '../../../components/AnchorButton.vue';

export default {
  name: 'DmHome',
  components: {
    DmAnchorButton
  }
};
</script>
