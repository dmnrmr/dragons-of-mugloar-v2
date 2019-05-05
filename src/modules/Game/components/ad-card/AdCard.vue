<template>
  <div class="box">
    <div class="level">
      <div class="level-left">
        <div class="lever-item">
          <span class="tag" :class="className">{{ ad.probability }}</span>
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

const classNameMap = {
  'Sure thing': 'is-light',
  'Piece of cake': 'is-info',
  'Quite likely': 'is-link',
  'Walk in the park': 'is-primary',
  Gamble: 'is-success',
  Risky: 'is-warning',
  'Playing with fire': 'is-danger',
  'Hmmm....': 'is-dark',
  'Suicide mission': 'is-black'
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
    className: ({ ad }) => classNameMap[ad.probability]
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
