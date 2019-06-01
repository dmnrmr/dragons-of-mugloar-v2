<template>
  <div class="reputation">
    <span>Reputation:</span>

    <div class="reputation__list">
      <div
        v-for="(rep, index) in gameReputation"
        :key="index"
        v-tooltip="rep.tooltip"
        :class="`reputation__list-item reputation__list-item--${rep.name}`"
      >
        <component :is="rep.iconComponent"></component>
        <span class="has-text-weight-bold">{{ rep.value | toFixed }}</span>
      </div>
    </div>

    <button
      v-tooltip="'Will use a turn'"
      class="button is-small reputation__action"
      @click="refreshReputation()"
    >
      <dm-cached></dm-cached>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.reputation {
  display: flex;
  align-items: center;

  &__list {
    display: flex;
    align-items: center;
    margin: 0 1rem;

    &-item {
      display: flex;
      align-items: center;
      margin-right: 0.5rem;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  &__action svg {
    height: 100%;
  }
}

.shop {
  display: flex;
  justify-content: flex-end;
}
</style>

<script>
import DmBrightness from '../../../../components/icons/brightness.svg';
import DmLocationCity from '../../../../components/icons/location_city.svg';
import DmSupervisorAccount from '../../../../components/icons/supervisor_account.svg';
import DmCached from '../../../../components/icons/cached.svg';
import tooltipDirective from '../../../../directives/tooltip';

const reputationComponentMap = {
  people: {
    iconComponent: DmSupervisorAccount,
    tooltip: 'People'
  },
  state: {
    iconComponent: DmLocationCity,
    tooltip: 'State'
  },
  underworld: {
    iconComponent: DmBrightness,
    tooltip: 'Underworld'
  }
};

const extendReputation = reputation => {
  const [name, value] = reputation;
  const { iconComponent, tooltip } = reputationComponentMap[name];

  return {
    iconComponent,
    name,
    tooltip,
    value
  };
};

export default {
  name: 'DmReputation',
  components: {
    DmBrightness,
    DmCached,
    DmLocationCity,
    DmSupervisorAccount
  },
  directives: {
    tooltip: tooltipDirective
  },
  filters: {
    toFixed: value => parseFloat(value).toFixed(2)
  },
  props: {
    reputation: {
      type: Object,
      required: true
    }
  },
  computed: {
    gameReputation: ({ reputation }) => Object.entries(reputation).map(extendReputation)
  },
  methods: {
    refreshReputation() {
      this.$emit('refresh-reputation');
    }
  }
};
</script>
