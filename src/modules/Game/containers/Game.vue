<template>
  <dm-content-layout>
    <div class="content-game">
      <h1 class="content-game__title">
        The game
      </h1>

      <div class="content-game__stats">
        {{ stats }}
      </div>
    </div>
  </dm-content-layout>
</template>

<style lang="scss" scoped>
/* stylelint-disable */
.content-game {
  padding: 2rem;

  &__title {
    text-transform: uppercase;
  }
}
/* stylelint-enable */
</style>

<script>
import { mapState } from 'vuex';
import DmContentLayout from '../../../layouts/ContentLayout.vue';

export default {
  name: 'DmGame',
  components: {
    DmContentLayout
  },
  computed: {
    ...mapState('game', ['stats'])
  }
};
</script>
