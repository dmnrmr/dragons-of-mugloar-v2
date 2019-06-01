<template>
  <div class="columns">
    <div class="column stats">
      <div
        v-for="(stat, index) in gameStats"
        :key="index"
        v-tooltip="stat.tooltip"
        :class="`stats__stat stats__stat--${stat.name}`"
      >
        <component :is="stat.iconComponent"></component>
        <span class="has-text-weight-bold">{{ stat.value }}</span>
      </div>
    </div>

    <div class="column shop">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stats {
  display: flex;
  align-items: center;

  &__stat {
    display: flex;
    align-items: center;
    margin-right: 0.5rem;
  }
}

.shop {
  display: flex;
  justify-content: flex-end;
}
</style>

<script>
import DmChartOutlined from '../../../../components/icons/chart-outlined.svg';
import DmFace from '../../../../components/icons/face.svg';
import DmFavorite from '../../../../components/icons/favorite.svg';
import DmForward from '../../../../components/icons/forward.svg';
import DmMoney from '../../../../components/icons/money.svg';
import tooltipDirective from '../../../../directives/tooltip';

const statComponentMap = {
  lives: {
    iconComponent: DmFavorite,
    tooltip: 'Number of lives you have'
  },
  gold: {
    iconComponent: DmMoney,
    tooltip: 'Amount of gold you have'
  },
  level: {
    iconComponent: DmFace,
    tooltip: 'Your current level'
  },
  score: {
    iconComponent: DmChartOutlined,
    tooltip: 'Current score'
  },
  turn: {
    iconComponent: DmForward,
    tooltip: 'Current turn'
  }
};

const filterHiddenStats = stat => {
  const hiddenStats = ['gameId', 'highScore'];
  const [name] = stat;

  return !hiddenStats.includes(name);
};

const extendStats = stat => {
  const [name, value] = stat;
  const { iconComponent, tooltip } = statComponentMap[name];

  return {
    iconComponent,
    name,
    tooltip,
    value
  };
};

export default {
  name: 'DmGameStats',
  components: {
    DmChartOutlined,
    DmFace,
    DmFavorite,
    DmForward,
    DmMoney
  },
  directives: {
    tooltip: tooltipDirective
  },
  props: {
    stats: {
      type: Object,
      required: true
    }
  },
  computed: {
    gameStats: ({ stats }) =>
      Object.entries(stats)
        .filter(filterHiddenStats)
        .map(extendStats)
  }
};
</script>
