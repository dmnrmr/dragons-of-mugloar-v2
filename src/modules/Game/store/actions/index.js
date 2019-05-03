import { fetchGame, fetchAds } from '../../services/data-service';
import LoadStatus from '../../constants';

export const startGame = ({ commit }) => {
  commit('STORE_GAME_LOADING_STATUS', LoadStatus.Loading);

  return fetchGame()
    .then(({ data: game }) => {
      commit('STORE_GAME', game);

      return fetchAds(game.gameId).then(({ data: ads }) => {
        commit('STORE_ADS', ads);
        commit('STORE_GAME_LOADING_STATUS', LoadStatus.Success);
      });
    })
    .catch(() => commit('STORE_GAME_LOADING_STATUS', LoadStatus.Fail));
};
