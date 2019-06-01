import LoadStatus from '../../constants';

export const GAME_OVER = state => (state.status = LoadStatus.Done);
export const INCREMENT_GAME_TURN = state => (state.game.turn += 1);
export const STORE_ADS = (state, ads) => (state.ads = ads);
export const STORE_GAME = (state, game) => (state.game = game);
export const STORE_GAME_LOADING_STATUS = (state, { status }) => (state.status = status);
export const STORE_ITEMS = (state, items) => (state.items = items);
export const STORE_REPUTATION = (state, reputation) => (state.reputation = reputation);
export const UPDATE_GAME = (state, game) =>
  (state.game = {
    ...state.game,
    ...game
  });
