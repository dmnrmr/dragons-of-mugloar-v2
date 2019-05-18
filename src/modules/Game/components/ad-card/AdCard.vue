<template>
  <div class="box">
    <div class="level is-mobile">
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
        :disabled="ad.encrypted"
        @click="solve(ad.adId)"
      >
        Solve
      </button>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
@import '~bulma/sass/utilities/mixins';

section {
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
    word-break: initial;
  }
}
</style>

<script>
import DmChartOutlined from '../../../../components/icons/insert-chart-outlined.svg';
import DmHourglass from '../../../../components/icons/hourglass.svg';
import DmMoney from '../../../../components/icons/attach-money.svg';
import tooltip from '../../../../directives/tooltip';

const getProbabilityTag = probability => {
  switch (probability) {
    case 'Sure thing': {
      return {
        probability: 98,
        className: 'is-info'
      };
    }

    case 'Piece of cake': {
      return {
        probability: 97,
        className: 'is-info'
      };
    }

    case 'Walk in the park': {
      return {
        probability: 88,
        className: 'is-success'
      };
    }

    case 'Hmmm....': {
      return {
        probability: 79,
        className: 'is-success'
      };
    }

    case 'Quite likely': {
      return {
        probability: 75,
        className: 'is-success'
      };
    }

    case 'Gamble': {
      return {
        probability: 55,
        className: 'is-warning'
      };
    }

    case 'Risky': {
      return {
        probability: 46,
        className: 'is-danger'
      };
    }

    case 'Rather detrimental': {
      return {
        probability: 34,
        className: 'is-danger'
      };
    }

    case 'Playing with fire': {
      return {
        probability: 25,
        className: 'is-black'
      };
    }

    case 'Suicide mission': {
      return {
        probability: 15,
        className: 'is-black'
      };
    }

    default: {
      return {
        probability: 0,
        className: 'is-light'
      };
    }
  }
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
    probabilityTag: ({ ad }) => getProbabilityTag(ad.probability)
  },
  methods: {
    solve(adId) {
      this.$emit('ad-solve', adId);
    }
  }
};
</script>
