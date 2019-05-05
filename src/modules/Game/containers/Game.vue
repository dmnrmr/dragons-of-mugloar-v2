<template>
  <div class="game" :class="{ 'game--is-loading': isLoading }">
    <template v-if="status !== LoadStatus.Fail">
      <dm-game-stats :stats="game" :is-loading="isLoading" />

      <div class="columns is-multiline">
        <div
          v-for="ad in ads"
          :key="ad.adId"
          class="column is-one-quarter-widescreen is-half-desktop is-half-tablet"
        >
          <dm-ad-card
            :ad="ad"
            @ad-solve="solveAd({ gameId: game.gameId, adId: $event })"
          />
        </div>
      </div>
    </template>

    <p v-if="status === LoadStatus.Fail" class="game-load-error">
      There was an error loading game.
    </p>
  </div>
</template>

<style lang="scss" scoped>
/* stylelint-disable */
.game {
  position: relative;

  &--is-loading:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
  }
}
/* stylelint-enable */
</style>

<script>
import { mapActions, mapState } from 'vuex';
import LoadStatus from '../constants';
import DmAdCard from '../components/ad-card/AdCard.vue';
import DmGameStats from '../components/game-stats/GameStats.vue';

export default {
  name: 'DmGame',
  components: {
    DmAdCard,
    DmGameStats
  },
  data: () => ({ LoadStatus }),
  computed: {
    ...mapState('game', ['status', 'game', 'ads']),
    isLoading() {
      return this.status === LoadStatus.Loading;
    }
  },
  methods: {
    ...mapActions('game', ['solveAd'])
  }
};
</script>
