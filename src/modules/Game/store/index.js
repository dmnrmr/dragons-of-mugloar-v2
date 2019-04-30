import mutations from './mutations';
import actions from './actions';

const store = {
  namespaced: true,
  state: {
    stats: {}
  },
  getters: {},
  actions,
  mutations
};

export default store;
