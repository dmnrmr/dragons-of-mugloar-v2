import Vue from 'vue';
import Vuex from 'vuex';
import game from './modules/Game/store';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    game
  }
});
