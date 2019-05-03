<template>
  <dm-content-layout>
    <div class="content-game">
      <h1 class="content-game__title">
        The game
      </h1>

      <template v-if="status === LoadStatus.Success">
        <div class="content-game__stats">
          {{ game }}
        </div>

        <ul class="content-game__ads">
          <li v-for="ad in ads" :key="ad.adId">
            {{ ad }}
          </li>
        </ul>
      </template>

      <p v-else>
        There was an error loading game.
      </p>
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
import LoadStatus from '../constants';

export default {
  name: 'DmGame',
  components: {
    DmContentLayout
  },
  data: () => ({ LoadStatus }),
  computed: {
    ...mapState('game', ['status', 'game', 'ads'])
  }
};
</script>
