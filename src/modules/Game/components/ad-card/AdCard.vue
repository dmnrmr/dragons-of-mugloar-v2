<template>
  <div class="box">
    <div class="level">
      <div class="level-left">
        <div class="lever-item">
          <span class="tag" :class="className">{{ ad.probability }}</span>
        </div>
      </div>

      <div class="level-right">
        <div class="level-item">
          <dm-star />
          <strong class="ad-reward">{{ ad.reward }}</strong>
        </div>

        <div class="level-item">
          <dm-hourglass />
          <strong class="ad-expires">{{ ad.expiresIn }}</strong>
        </div>
      </div>
    </div>

    <section class="ad-message">
      {{ ad.message }}
    </section>

    <footer>
      <button
        class="button is-small is-fullwidth is-outlined is-link ad-take-action"
        @click="takeAction(ad.adId)"
      >
        Take action
      </button>
    </footer>
  </div>
</template>

<script>
import DmHourglass from '../../../../components/icons/hourglass.svg';
import DmStar from '../../../../components/icons/star.svg';

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
    DmHourglass,
    DmStar
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
    takeAction(adId) {
      this.$emit('ad-take-action', adId);
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
