<template>
  <div class="home-page">
    <h1 class="home-page__title">
      Dragons of Mugloar 2
    </h1>

    <nav class="home-page__navigation">
      <dm-anchor-button
        class="home-page__navigation-item"
        :text="'Play game'"
        :to="'/play'"
      />

      <dm-anchor-button
        class="home-page__navigation-item"
        :text="'About the game'"
        :to="'/about'"
      />
    </nav>
  </div>
</template>

<style lang="scss" scoped>
/* stylelint-disable */
.home-page {
  display: flex;
  height: 100%;
  padding: 1rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__title {
    font-size: 6em;
    line-height: 4rem;
    text-transform: uppercase;
  }

  &__navigation {
    padding-top: 2rem;

    &-item {
      margin-right: 2rem;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  @media all and (max-width: 1199px) {
    &__title {
      text-transform: uppercase;
      text-align: center;
    }
  }

  @media all and (max-width: 575px) {
    &__title {
      font-size: 2rem;
      line-height: normal;
    }

    &__navigation {
      width: 100%;
      padding-top: 1rem;

      &-item {
        margin-right: 0;
        margin-bottom: 1rem;
        width: 100%;
      }
    }
  }
}
/* stylelint-enable */
</style>

<script>
import DmAnchorButton from '../../../components/anchor-button/AnchorButton.vue';

export default {
  name: 'DmHome',
  components: {
    DmAnchorButton
  }
};
</script>
