import {
  fetchAds,
  fetchBuyItem,
  fetchGame,
  fetchItems,
  fetchSolveAd
} from '../../services/data-service';
import LoadStatus from '../../constants';
import notification from '../../../../services/notification';

const decodeAds = ads =>
  ads.map(ad => {
    const { adId, encrypted, message, probability } = ad;

    if (!encrypted) {
      return ad;
    }

    return {
      ...ad,
      adId: atob(adId),
      message: atob(message),
      probability: atob(probability)
    };
  });

const getAds = (gameId, commit) =>
  fetchAds(gameId).then(({ data }) => {
    const ads = decodeAds(data);

    commit('STORE_ADS', ads);
  });

const getItems = (gameId, commit) =>
  fetchItems(gameId).then(({ data: items }) => {
    commit('STORE_ITEMS', items);
  });

export const startGame = ({ commit }) => {
  commit('STORE_GAME_LOADING_STATUS', { status: LoadStatus.Loading });

  return fetchGame()
    .then(({ data: game }) => {
      commit('STORE_GAME', game);

      return Promise.all([
        getAds(game.gameId, commit),
        getItems(game.gameId, commit)
      ]).then(() => commit('STORE_GAME_LOADING_STATUS', { status: LoadStatus.Success }));
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

      return getAds(gameId, commit).then(() =>
        commit('STORE_GAME_LOADING_STATUS', { status: LoadStatus.Success })
      );
    })
    .catch(e => commit('STORE_GAME_LOADING_STATUS', { status: LoadStatus.Fail, e }));
};

export const buyItem = ({ commit }, { gameId, itemId }) => {
  commit('STORE_GAME_LOADING_STATUS', { status: LoadStatus.Loading });

  return fetchBuyItem(gameId, itemId)
    .then(({ data }) => {
      const { shoppingSuccess, ...game } = data;

      commit('UPDATE_GAME', game);

      return getAds(gameId, commit).then(() =>
        commit('STORE_GAME_LOADING_STATUS', { status: LoadStatus.Success })
      );
    })
    .catch(e => commit('STORE_GAME_LOADING_STATUS', { status: LoadStatus.Fail, e }));
};
