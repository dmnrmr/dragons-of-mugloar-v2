export default {
  STORE_STATS_LOADING_STATUS: (state, status) => (state.stats.status = status),
  STORE_STATS: (state, stats) => (state.stats = stats)
};
