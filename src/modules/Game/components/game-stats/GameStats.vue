<template>
  <div class="level">
    <div class="level-left">
      <div
        v-for="(stat, index) in gameStats"
        :key="index"
        :class="`level-item stat stat--${stat.name}`"
      >
        <component :is="stat.iconComponent"></component>
        <span class="has-text-weight-bold">{{ stat.value }}</span>
      </div>
    </div>

    <div class="level-right">
      <div class="level-item">
        <button class="button is-small is-fullwidth is-outlined is-link" disabled>
          Restart the game
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import DmChart from '../../../../components/icons/insert-chart.svg';
import DmChartOutlined from '../../../../components/icons/insert-chart-outlined.svg';
import DmFace from '../../../../components/icons/round-face.svg';
import DmFavorite from '../../../../components/icons/favorite.svg';
import DmForward from '../../../../components/icons/forward.svg';
import DmMoney from '../../../../components/icons/attach-money.svg';

const statComponentMap = {
  lives: DmFavorite,
  gold: DmMoney,
  level: DmFace,
  score: DmChartOutlined,
  highScore: DmChart,
  turn: DmForward
};

const filterHiddenStats = stat => {
  const hiddenStats = ['gameId'];
  const [name] = stat;

  return !hiddenStats.includes(name);
};

const extendStats = stat => {
  const [name, value] = stat;

  return {
    iconComponent: statComponentMap[name],
    name,
    value
  };
};

export default {
  name: 'DmGameStats',
  components: {
    DmChart,
    DmChartOutlined,
    DmFace,
    DmFavorite,
    DmForward,
    DmMoney
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
