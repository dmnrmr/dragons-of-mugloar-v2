import { STORE_GAME_LOADING_STATUS, STORE_GAME, STORE_ADS } from './index';
import LoadStatus from '../../constants';
import game from '../../../../../test/fixtures/game.json';
import ads from '../../../../../test/fixtures/ads.json';

describe('Game mutations', () => {
  it('should store game loading status', () => {
    const state = { status: LoadStatus.Initial };

    STORE_GAME_LOADING_STATUS(state, LoadStatus.Success);

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
});
