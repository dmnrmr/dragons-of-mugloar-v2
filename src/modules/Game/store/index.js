import LoadStatus from '../constants';
import { buyItem, investigateReputation, startGame, solveAd } from './actions';
import {
  GAME_OVER,
  INCREMENT_GAME_TURN,
  STORE_ADS,
  STORE_GAME_LOADING_STATUS,
  STORE_GAME,
  STORE_ITEMS,
  STORE_REPUTATION,
  UPDATE_GAME
} from './mutations';

const store = {
  namespaced: true,
  state: {
    ads: [],
    game: {},
    items: [],
    reputation: {},
    status: LoadStatus.Initial
  },
  getters: {},
  actions: {
    buyItem,
    investigateReputation,
    solveAd,
    startGame
  },
  mutations: {
    GAME_OVER,
    INCREMENT_GAME_TURN,
    STORE_ADS,
    STORE_GAME_LOADING_STATUS,
    STORE_GAME,
    STORE_ITEMS,
    STORE_REPUTATION,
    UPDATE_GAME
  }
};

export default store;
