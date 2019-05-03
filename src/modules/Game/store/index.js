import LoadStatus from '../constants';
import { startGame } from './actions';
import { STORE_GAME_LOADING_STATUS, STORE_GAME, STORE_ADS } from './mutations';

const store = {
  namespaced: true,
  state: {
    status: LoadStatus.Initial,
    game: {},
    ads: []
  },
  getters: {},
  actions: {
    startGame
  },
  mutations: {
    STORE_GAME_LOADING_STATUS,
    STORE_GAME,
    STORE_ADS
  }
};

export default store;
