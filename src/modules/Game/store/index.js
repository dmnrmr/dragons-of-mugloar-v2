import LoadStatus from '../constants';
import { buyItem, startGame, solveAd } from './actions';
import {
  GAME_OVER,
  STORE_ADS,
  STORE_GAME_LOADING_STATUS,
  STORE_GAME,
  STORE_ITEMS,
  UPDATE_GAME
} from './mutations';

const store = {
  namespaced: true,
  state: {
    status: LoadStatus.Initial,
    game: {},
    ads: [],
    items: []
  },
  getters: {},
  actions: {
    buyItem,
    startGame,
    solveAd
  },
  mutations: {
    GAME_OVER,
    STORE_ADS,
    STORE_GAME_LOADING_STATUS,
    STORE_GAME,
    STORE_ITEMS,
    UPDATE_GAME
  }
};

export default store;
