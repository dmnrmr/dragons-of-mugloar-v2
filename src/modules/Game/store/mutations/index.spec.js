import {
  GAME_OVER,
  STORE_ADS,
  STORE_GAME_LOADING_STATUS,
  STORE_GAME,
  STORE_ITEMS,
  UPDATE_GAME
} from './index';
import ads from '../../../../../test/fixtures/ads.json';
import game from '../../../../../test/fixtures/game.json';
import items from '../../../../../test/fixtures/shopItems.json';
import solvedAdUpdate from '../../../../../test/fixtures/solveAd.json';
import LoadStatus from '../../constants';

describe('Game mutations', () => {
  it('should store game loading status', () => {
    const state = { status: LoadStatus.Initial };

    STORE_GAME_LOADING_STATUS(state, { status: LoadStatus.Success });

    expect(state.status).to.equal(LoadStatus.Success);
  });

  it('should store game', () => {
    const state = { game: {} };

    STORE_GAME(state, game);

    expect(state.game).to.equal(game);
  });

  it('should store ads', () => {
    const state = { ads: [] };

    STORE_ADS(state, ads);

    expect(state.ads).to.equal(ads);
  });

  it('should store shop items', () => {
    const state = { items: [] };

    STORE_ITEMS(state, items);

    expect(state.items).to.equal(items);
  });

  it('should store update game', () => {
    const state = { game };

    UPDATE_GAME(state, solvedAdUpdate);

    expect(state.game).to.deep.equal({
      ...game,
      ...solvedAdUpdate
    });
  });

  it('should store game over status', () => {
    const state = { status: LoadStatus.Success };

    GAME_OVER(state);

    expect(state.status).to.equal(LoadStatus.Done);
  });
});
