<template>
  <div class="box">
    <div class="level is-mobile">
      <div class="level-left">
        <div class="lever-item">
          <span class="tag" :class="probabilityClassName">
            {{ ad.probability }}
          </span>
        </div>
      </div>

      <div class="level-right">
        <div v-tooltip="'Ad reward'" class="level-item">
          <dm-chart-outlined />
          <dm-money />
          <strong class="dm-ad-reward">{{ ad.reward }}</strong>
        </div>

        <div v-tooltip="'Ad expires in'" class="level-item">
          <dm-hourglass />
          <strong class="dm-ad-expires">{{ ad.expiresIn }}</strong>
        </div>
      </div>
    </div>

    <section class="dm-ad-message">
      {{ ad.message }}
    </section>

    <footer>
      <button
        class="button is-small is-fullwidth is-outlined is-link dm-ad-solve"
        @click="solve(ad.adId)"
      >
        Solve
      </button>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
@import '~bulma/sass/utilities/mixins';

.dm-ad-message {
  height: 5rem;

  @include until($widescreen) {
    height: 3.5rem;
  }

  @include until($widescreen) {
    height: 3.5rem;
  }

  @include until($tablet) {
    height: auto;
    padding-bottom: 1rem;
  }
}
</style>

<script>
import DmChartOutlined from '../../../../components/icons/chart-outlined.svg';
import DmHourglass from '../../../../components/icons/hourglass.svg';
import DmMoney from '../../../../components/icons/money.svg';
import tooltip from '../../../../directives/tooltip';

const probabilityClassName = {
  'Sure thing': 'is-info',
  'Piece of cake': 'is-info',
  'Walk in the park': 'is-success',
  'Hmmm....': 'is-success',
  'Quite likely': 'is-success',
  Gamble: 'is-warning',
  Risky: 'is-danger',
  'Rather detrimental': 'is-danger',
  'Playing with fire': 'is-black',
  'Suicide mission': 'is-black',
  Impossible: 'is-light'
};

export default {
  name: 'DmAdCard',
  components: {
    DmChartOutlined,
    DmHourglass,
    DmMoney
  },
  directives: {
    tooltip
  },
  props: {
    ad: {
      type: Object,
      required: true
    }
  },
  computed: {
    probabilityClassName: ({ ad }) => probabilityClassName[ad.probability]
  },
  methods: {
    solve(adId) {
      this.$emit('ad-solve', adId);
    }
  }
};
</script>
