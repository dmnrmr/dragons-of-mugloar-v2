import LoadStatus from '../constants';
import { startGame, solveAd } from './actions';
import {
  STORE_GAME_LOADING_STATUS,
  STORE_GAME,
  STORE_ADS,
  UPDATE_GAME,
  GAME_OVER
} from './mutations';

const store = {
  namespaced: true,
  state: {
    status: LoadStatus.Initial,
    game: {},
    ads: []
  },
  getters: {},
  actions: {
    startGame,
    solveAd
  },
  mutations: {
    STORE_GAME_LOADING_STATUS,
    STORE_GAME,
    STORE_ADS,
    UPDATE_GAME,
    GAME_OVER
  }
};

export default store;
