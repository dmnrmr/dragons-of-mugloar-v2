<template>
  <div class="game" :class="{ 'game--is-loading': isLoading }">
    <span class="game__loader loader"></span>

    <template v-if="status !== LoadStatus.Fail">
      <dm-game-stats :stats="game">
        <dm-item-shop
          :gold="game.gold"
          :items="items"
          @item-buy="buyItem({ gameId: game.gameId, itemId: $event })"
        ></dm-item-shop>
      </dm-game-stats>

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
$loader-padding: 3rem;

.game {
  position: relative;

  &__loader {
    display: none;
    position: absolute;
    top: calc(50% - #{$loader-padding});
    left: calc(50% - #{$loader-padding});
    padding: $loader-padding;
  }

  &--is-loading:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5);
  }

  &--is-loading &__loader {
    display: block;
  }
}
</style>

<script>
import { mapActions, mapState } from 'vuex';
import LoadStatus from '../constants';
import DmAdCard from '../components/ad-card/AdCard.vue';
import DmGameStats from '../components/game-stats/GameStats.vue';
import DmItemShop from '../components/item-shop/ItemShop.vue';

export default {
  name: 'DmGame',
  components: {
    DmAdCard,
    DmGameStats,
    DmItemShop
  },
  data: () => ({ LoadStatus }),
  computed: {
    ...mapState('game', ['status', 'game', 'ads', 'items']),
    isLoading() {
      return this.status === LoadStatus.Loading;
    }
  },
  methods: {
    ...mapActions('game', ['buyItem', 'solveAd'])
  }
};
</script>
