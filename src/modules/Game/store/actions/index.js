import { fetchGame } from '../../services/data-service';
import LoadStatus from '../../constants';

export default {
  startGame: ({ commit }) => {
    commit('STORE_STATS_LOADING_STATUS', LoadStatus.Loading);

    return fetchGame()
      .then(({ data }) =>
        commit('STORE_STATS', {
          ...data,
          status: LoadStatus.Success
        })
      )
      .catch(() => commit('STORE_STATS_LOADING_STATUS', LoadStatus.Failed));
  }
};
