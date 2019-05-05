import sinon from 'sinon';
import game from '../../../../../test/fixtures/game.json';
import ads from '../../../../../test/fixtures/ads.json';
import LoadStatus from '../../constants';

const actionsInjector = require('inject-loader!./index'); // eslint-disable-line

const dataService = {
  fetchGame: () => {},
  fetchAds: () => {}
};

const actions = actionsInjector({
  '../../services/data-service': dataService
});

describe('Game actions', () => {
  const sandbox = sinon.createSandbox();
  const commit = sandbox.spy();

  beforeEach(() => {
    sandbox.stub(dataService, 'fetchGame').resolves({ data: game });
    sandbox.stub(dataService, 'fetchAds').resolves({ data: ads });
  });

  afterEach(() => {
    sandbox.restore();
    commit.resetHistory();
  });

  it('should commit game loading status before game is fetched', () => {
    return actions.startGame({ commit }).then(() => {
      expect(commit.getCall(0)).to.have.been.calledWithExactly(
        'STORE_GAME_LOADING_STATUS',
        LoadStatus.Loading
      );
    });
  });

  it('should start fetching game', () => {
    return actions.startGame({ commit }).then(() => {
      expect(dataService.fetchGame).to.have.been.called;
    });
  });

  it('should commit store game after game is fetched successfully', () => {
    return actions.startGame({ commit }).then(() => {
      expect(commit.getCall(1)).to.have.been.calledWithExactly('STORE_GAME', game);
    });
  });

  it('should start fetching ads after game is fetched successfully', () => {
    return actions.startGame({ commit }).then(() => {
      expect(dataService.fetchAds).to.have.been.calledWith(game.gameId);
    });
  });

  it('should commit store ads after ads are fetched successfully', () => {
    return actions.startGame({ commit }).then(() => {
      expect(commit.getCall(2)).to.have.been.calledWithExactly('STORE_ADS', ads);
    });
  });

  it('should commit game loading status after ads are fetched successfully', () => {
    return actions.startGame({ commit }).then(() => {
      expect(commit.getCall(3)).to.have.been.calledWithExactly(
        'STORE_GAME_LOADING_STATUS',
        LoadStatus.Success
      );
    });
  });

  it('should commit game loading status after game is fetched unsuccessfully', () => {
    dataService.fetchGame.rejects();

    return actions.startGame({ commit }).then(() => {
      expect(commit.getCall(1)).to.have.been.calledWithExactly(
        'STORE_GAME_LOADING_STATUS',
        LoadStatus.Fail
      );
    });
  });

  it('should commit game loading status after ads are fetched unsuccessfully', () => {
    dataService.fetchAds.rejects();

    return actions.startGame({ commit }).then(() => {
      expect(commit.getCall(2)).to.have.been.calledWithExactly(
        'STORE_GAME_LOADING_STATUS',
        LoadStatus.Fail
      );
    });
  });
});
