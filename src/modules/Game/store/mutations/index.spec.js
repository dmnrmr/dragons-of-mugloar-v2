import {
  GAME_OVER,
  STORE_ADS,
  STORE_GAME_LOADING_STATUS,
  STORE_GAME,
  UPDATE_GAME
} from './index';
import LoadStatus from '../../constants';
import game from '../../../../../test/fixtures/game.json';
import gameUpdate from '../../../../../test/fixtures/gameUpdate.json';
import ads from '../../../../../test/fixtures/ads.json';

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

  it('should store update game', () => {
    const state = { game };

    UPDATE_GAME(state, gameUpdate);

    expect(state.game).to.deep.equal({
      ...game,
      ...gameUpdate
    });
  });

  it('should store game over status', () => {
    const state = { status: LoadStatus.Success };

    GAME_OVER(state);

    expect(state.status).to.equal(LoadStatus.Done);
  });
});
