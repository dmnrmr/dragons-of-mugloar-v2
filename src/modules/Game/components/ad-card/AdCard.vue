<template>
  <div class="box">
    <div class="level">
      <div class="level-left">
        <div class="lever-item">
          <span v-tooltip="ad.probability" class="tag" :class="probabilityTag.className">
            ~{{ probabilityTag.probability }}%
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

<script>
import DmChartOutlined from '../../../../components/icons/insert-chart-outlined.svg';
import DmHourglass from '../../../../components/icons/hourglass.svg';
import DmMoney from '../../../../components/icons/attach-money.svg';

const probabilityTagMap = {
  'Sure thing': {
    probability: 98,
    className: 'is-info'
  },
  'Piece of cake': {
    probability: 97,
    className: 'is-info'
  },
  'Walk in the park': {
    probability: 88,
    className: 'is-success'
  },
  'Hmmm....': {
    probability: 79,
    className: 'is-success'
  },
  'Quite likely': {
    probability: 75,
    className: 'is-warning'
  },
  Gamble: {
    probability: 55,
    className: 'is-warning'
  },
  Risky: {
    probability: 46,
    className: 'is-danger'
  },
  'Rather detrimental': {
    probability: 34,
    className: 'is-danger'
  },
  'Playing with fire': {
    probability: 25,
    className: 'is-black'
  },
  'Suicide mission': {
    probability: 15,
    className: 'is-black'
  }
};

export default {
  name: 'DmAdCard',
  components: {
    DmChartOutlined,
    DmHourglass,
    DmMoney
  },
  props: {
    ad: {
      type: Object,
      required: true
    }
  },
  computed: {
    probabilityTag: ({ ad }) => probabilityTagMap[ad.probability]
  },
  methods: {
    solve(adId) {
      this.$emit('ad-solve', adId);
    }
  }
};
</script>

<style lang="scss" scoped>
/* stylelint-disable */
@import '~bulma/sass/utilities/mixins';

section {
  height: 5rem;

  @include until($widescreen) {
    height: 3rem;
  }

  @include mobile {
    min-height: 2rem;
    height: 100%;
  }
}
/* stylelint-enable */
</style>
