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

const getAds = async (gameId, commit) => {
  const { data } = await fetchAds(gameId);
  const ads = decodeAds(data);

  return commit('STORE_ADS', ads);
};

const getItems = async (gameId, commit) => {
  const { data: items } = await fetchItems(gameId);

  return commit('STORE_ITEMS', items);
};

export const startGame = async ({ commit }) => {
  commit('STORE_GAME_LOADING_STATUS', { status: LoadStatus.Loading });

  try {
    const { data: game } = await fetchGame();

    commit('STORE_GAME', game);

    await Promise.all([getAds(game.gameId, commit), getItems(game.gameId, commit)]);

    return commit('STORE_GAME_LOADING_STATUS', { status: LoadStatus.Success });
  } catch (e) {
    return commit('STORE_GAME_LOADING_STATUS', { status: LoadStatus.Fail });
  }
};

export const solveAd = async ({ commit }, { gameId, adId }) => {
  commit('STORE_GAME_LOADING_STATUS', { status: LoadStatus.Loading });

  try {
    const { data } = await fetchSolveAd(gameId, adId);
    const { message, success, ...game } = data;
    const notificator = success ? notification.success : notification.error;

    notificator(message);
    commit('UPDATE_GAME', game);

    if (!game.lives) {
      return commit('GAME_OVER');
    }

    await getAds(gameId, commit);

    return commit('STORE_GAME_LOADING_STATUS', { status: LoadStatus.Success });
  } catch (e) {
    return commit('STORE_GAME_LOADING_STATUS', { status: LoadStatus.Fail, e });
  }
};

export const buyItem = async ({ commit }, { gameId, itemId }) => {
  commit('STORE_GAME_LOADING_STATUS', { status: LoadStatus.Loading });

  try {
    const { data } = await fetchBuyItem(gameId, itemId);
    const { shoppingSuccess, ...game } = data;

    commit('UPDATE_GAME', game);

    await getAds(gameId, commit);

    return commit('STORE_GAME_LOADING_STATUS', { status: LoadStatus.Success });
  } catch (e) {
    return commit('STORE_GAME_LOADING_STATUS', { status: LoadStatus.Fail, e });
  }
};
