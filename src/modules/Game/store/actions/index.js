import { fetchAds, fetchGame, fetchSolveAd } from '../../services/data-service';
import LoadStatus from '../../constants';
import notification from '../../../../services/notification';

const getAds = (gameId, commit) =>
  fetchAds(gameId).then(({ data: ads }) => {
    commit('STORE_ADS', ads);
    commit('STORE_GAME_LOADING_STATUS', { status: LoadStatus.Success });
  });

export const startGame = ({ commit }) => {
  commit('STORE_GAME_LOADING_STATUS', { status: LoadStatus.Loading });

  return fetchGame()
    .then(({ data: game }) => {
      commit('STORE_GAME', game);

      return getAds(game.gameId, commit);
    })
    .catch(() => commit('STORE_GAME_LOADING_STATUS', { status: LoadStatus.Fail }));
};

export const solveAd = ({ commit }, { gameId, adId }) => {
  commit('STORE_GAME_LOADING_STATUS', { status: LoadStatus.Loading });

  return fetchSolveAd(gameId, adId)
    .then(({ data }) => {
      const { message, success, ...game } = data;
      const notificator = success ? notification.success : notification.error;

      notificator(message);
      commit('UPDATE_GAME', game);

      if (!game.lives) {
        return commit('GAME_OVER');
      }

      return getAds(gameId, commit);
    })
    .catch(e => commit('STORE_GAME_LOADING_STATUS', { status: LoadStatus.Fail, e }));
};
