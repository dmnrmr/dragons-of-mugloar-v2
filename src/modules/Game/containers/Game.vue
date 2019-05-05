<template>
  <div>
    <template v-if="status === LoadStatus.Success">
      <dm-game-stats :stats="game" />

      <div class="columns is-multiline">
        <div
          v-for="ad in ads"
          :key="ad.adId"
          class="column is-one-quarter-widescreen is-half-desktop is-half-tablet"
        >
          <dm-ad-card :ad="ad" @ad-take-action="adTakeAction($event)" />
        </div>
      </div>
    </template>

    <p v-else class="game-load-error">
      There was an error loading game.
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex';
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
    ...mapState('game', ['status', 'game', 'ads'])
  },
  methods: {
    adTakeAction(adId) {
      // eslint-disable-next-line
      console.log('** Ad take action on', adId);
    }
  }
};
</script>
