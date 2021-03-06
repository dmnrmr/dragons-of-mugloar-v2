import sinon from 'sinon';
import boughItemUpdate from '../../../../../test/fixtures/buyItem.json';
import encryptedAds from '../../../../../test/fixtures/encryptedAds.json';
import game from '../../../../../test/fixtures/game.json';
import items from '../../../../../test/fixtures/shopItems.json';
import otherAds from '../../../../../test/fixtures/ads.json';
import reputation from '../../../../../test/fixtures/reputation.json';
import solvedAdUpdate from '../../../../../test/fixtures/solveAd.json';
import unencryptedAds from '../../../../../test/fixtures/unencryptedAds.json';
import LoadStatus from '../../constants';

const actionsInjector = require('inject-loader!./index'); // eslint-disable-line

const dataService = {
  fetchAds: () => {},
  fetchBuyItem: () => {},
  fetchGame: () => {},
  fetchItems: () => {},
  fetchReputation: () => {},
  fetchSolveAd: () => {}
};
const notificationService = {
  error: () => {},
  success: () => {}
};

const actions = actionsInjector({
  '../../services/data-service': dataService,
  '../../../../services/notification': notificationService
});

describe('Game actions', () => {
  const sandbox = sinon.createSandbox();
  const commit = sandbox.spy();
  const ads = [...otherAds, ...encryptedAds];
  const readableAds = [...otherAds, ...unencryptedAds];

  beforeEach(() => {
    sandbox.stub(dataService, 'fetchAds').resolves({ data: ads });
    sandbox.stub(dataService, 'fetchBuyItem').resolves({ data: boughItemUpdate });
    sandbox.stub(dataService, 'fetchGame').resolves({ data: game });
    sandbox.stub(dataService, 'fetchItems').resolves({ data: items });
    sandbox.stub(dataService, 'fetchReputation').resolves({ data: reputation });
    sandbox.stub(dataService, 'fetchSolveAd').resolves({ data: solvedAdUpdate });
    sandbox.spy(notificationService, 'error');
    sandbox.spy(notificationService, 'success');
  });

  afterEach(() => {
    sandbox.restore();
    commit.resetHistory();
  });

  describe('Start game', () => {
    const startGame = () => actions.startGame({ commit });

    it('should set reputation before game is fetched', async () => {
      await startGame();

      expect(commit.getCall(0)).to.have.been.calledWithExactly('STORE_REPUTATION', {
        people: 0,
        state: 0,
        underworld: 0
      });
    });

    it('should commit game loading status before game is fetched', async () => {
      await startGame();

      expect(commit.getCall(1)).to.have.been.calledWithExactly(
        'STORE_GAME_LOADING_STATUS',
        { status: LoadStatus.Loading }
      );
    });

    it('should start fetching game', async () => {
      await startGame();

      expect(dataService.fetchGame).to.have.been.called;
    });

    it('should commit game payload after game is fetched successfully', async () => {
      await startGame();

      expect(commit.getCall(2)).to.have.been.calledWithExactly('STORE_GAME', game);
    });

    it('should start fetching ads after game is fetched successfully', async () => {
      await startGame();

      expect(dataService.fetchAds).to.have.been.calledWith(game.gameId);
    });

    it('should start fetching shop items after game is fetched successfully', async () => {
      await startGame();

      expect(dataService.fetchItems).to.have.been.calledWith(game.gameId);
    });

    it('should commit ads payload after ads are fetched successfully', async () => {
      await startGame();

      expect(commit.getCall(3)).to.have.been.calledWithExactly('STORE_ADS', readableAds);
    });

    it('should commit shop items payload after items are fetched successfully', async () => {
      await startGame();

      expect(commit.getCall(4)).to.have.been.calledWithExactly('STORE_ITEMS', items);
    });

    it('should commit game loading status after ads and shop items are fetched successfully', async () => {
      await startGame();

      expect(commit.getCall(5)).to.have.been.calledWithExactly(
        'STORE_GAME_LOADING_STATUS',
        { status: LoadStatus.Success }
      );
    });

    it('should commit game loading status after game is fetched unsuccessfully', async () => {
      dataService.fetchGame.rejects();

      await startGame();

      expect(commit.getCall(2)).to.have.been.calledWithExactly(
        'STORE_GAME_LOADING_STATUS',
        { status: LoadStatus.Fail }
      );
    });

    it('should commit game loading status after ads are fetched unsuccessfully', async () => {
      dataService.fetchAds.rejects();

      await startGame();

      expect(commit.getCall(4)).to.have.been.calledWithExactly(
        'STORE_GAME_LOADING_STATUS',
        { status: LoadStatus.Fail }
      );
    });

    it('should commit game loading status after shop items are fetched unsuccessfully', async () => {
      dataService.fetchItems.rejects();

      await startGame();

      expect(commit.getCall(4)).to.have.been.calledWithExactly(
        'STORE_GAME_LOADING_STATUS',
        { status: LoadStatus.Fail }
      );
    });
  });

  describe('Solve ad', () => {
    const { gameId } = game;
    const [{ adId }] = ads;
    const solveAd = () => actions.solveAd({ commit }, { gameId, adId });

    it('should commit game loading status before ad is solved', async () => {
      await solveAd();

      expect(commit.getCall(0)).to.have.been.calledWithExactly(
        'STORE_GAME_LOADING_STATUS',
        { status: LoadStatus.Loading }
      );
    });

    it('should start solving ad', async () => {
      await solveAd();

      expect(dataService.fetchSolveAd).to.have.been.calledWithExactly(gameId, adId);
    });

    it('should emit a success notification if ad is solved', async () => {
      await solveAd();

      expect(notificationService.success).to.have.been.calledWithExactly(
        solvedAdUpdate.message
      );
    });

    it('should emit an error notification if ad is solved unsuccessfully', async () => {
      dataService.fetchSolveAd.resolves({
        data: {
          ...solvedAdUpdate,
          success: false
        }
      });

      await solveAd();

      expect(notificationService.error).to.have.been.calledWithExactly(
        solvedAdUpdate.message
      );
    });

    it('should commit game updated payload after ad is solved successfully', async () => {
      const { message, success, ...updatedGameStats } = solvedAdUpdate;

      await solveAd();

      expect(commit.getCall(1)).to.have.been.calledWithExactly(
        'UPDATE_GAME',
        updatedGameStats
      );
    });

    it('should start fetching ads after ad is solved successfully', async () => {
      await solveAd();

      expect(dataService.fetchAds).to.have.been.calledWith(game.gameId);
    });

    it('should commit ads payload after ads are fetched successfully', async () => {
      await solveAd();

      expect(commit.getCall(2)).to.have.been.calledWithExactly('STORE_ADS', readableAds);
    });

    it('should commit game loading status after ads are fetched successfully', async () => {
      await solveAd();

      expect(commit.getCall(3)).to.have.been.calledWithExactly(
        'STORE_GAME_LOADING_STATUS',
        { status: LoadStatus.Success }
      );
    });

    it('should commit game over status after ad is solved successfully and there are no lives left', async () => {
      dataService.fetchSolveAd.resolves({
        data: {
          ...solvedAdUpdate,
          lives: 0
        }
      });

      await solveAd();

      expect(commit.getCall(2)).to.have.been.calledWithExactly('GAME_OVER');
    });

    it('should not fetch ads after ad is solved successfully and there are no lives left', async () => {
      dataService.fetchSolveAd.resolves({
        data: {
          ...solvedAdUpdate,
          lives: 0
        }
      });

      await solveAd();

      expect(dataService.fetchAds).to.not.have.been.called;
    });

    it('should commit game loading status after solving ad is unsuccessful', async () => {
      const e = Error('foo');
      const expectedPayload = {
        status: LoadStatus.Fail,
        e
      };

      dataService.fetchSolveAd.rejects(e);

      await solveAd();

      expect(commit.getCall(1)).to.have.been.calledWith(
        'STORE_GAME_LOADING_STATUS',
        sinon.match(expectedPayload)
      );
    });

    it('should commit game loading status after ads are fetched unsuccessfully', async () => {
      const e = Error('foo');
      const expectedPayload = {
        status: LoadStatus.Fail,
        e
      };

      dataService.fetchAds.rejects(e);

      await solveAd();

      expect(commit.getCall(2)).to.have.been.calledWith(
        'STORE_GAME_LOADING_STATUS',
        sinon.match(expectedPayload)
      );
    });
  });

  describe('Buy item', () => {
    const { gameId } = game;
    const [{ id }] = items;
    const buyItem = () => actions.buyItem({ commit }, { gameId, itemId: id });

    it('should commit game loading status before item is bought', async () => {
      await buyItem();

      expect(commit.getCall(0)).to.have.been.calledWithExactly(
        'STORE_GAME_LOADING_STATUS',
        { status: LoadStatus.Loading }
      );
    });

    it('should start buying item', async () => {
      await buyItem();

      expect(dataService.fetchBuyItem).to.have.been.calledWithExactly(gameId, id);
    });

    it('should commit game updated payload after item is bought', async () => {
      const { shoppingSuccess, ...updatedGameStats } = boughItemUpdate;

      await buyItem();

      expect(commit.getCall(1)).to.have.been.calledWithExactly(
        'UPDATE_GAME',
        updatedGameStats
      );
    });

    it('should start fetching ads after items is bought', async () => {
      await buyItem();

      expect(dataService.fetchAds).to.have.been.calledWith(game.gameId);
    });

    it('should commit ads payload after ads are fetched successfully', async () => {
      await buyItem();

      expect(commit.getCall(2)).to.have.been.calledWithExactly('STORE_ADS', readableAds);
    });

    it('should commit game loading status after ads are fetched successfully', async () => {
      await buyItem();

      expect(commit.getCall(3)).to.have.been.calledWithExactly(
        'STORE_GAME_LOADING_STATUS',
        { status: LoadStatus.Success }
      );
    });

    it('should commit game loading status after buying an item was unsuccessful', async () => {
      const e = Error('foo');
      const expectedPayload = {
        status: LoadStatus.Fail,
        e
      };

      dataService.fetchBuyItem.rejects(e);

      await buyItem();

      expect(commit.getCall(1)).to.have.been.calledWith(
        'STORE_GAME_LOADING_STATUS',
        sinon.match(expectedPayload)
      );
    });

    it('should commit game loading status after ads are fetched unsuccessfully', async () => {
      const e = Error('foo');
      const expectedPayload = {
        status: LoadStatus.Fail,
        e
      };

      dataService.fetchAds.rejects(e);

      await buyItem();

      expect(commit.getCall(2)).to.have.been.calledWith(
        'STORE_GAME_LOADING_STATUS',
        sinon.match(expectedPayload)
      );
    });
  });

  describe('Investigate reputation', () => {
    const { gameId } = game;
    const investigateReputation = () => actions.investigateReputation({ commit }, gameId);

    it('should commit game loading status before reputation is fetched', async () => {
      await investigateReputation();

      expect(commit.getCall(0)).to.have.been.calledWithExactly(
        'STORE_GAME_LOADING_STATUS',
        { status: LoadStatus.Loading }
      );
    });

    it('should commit game turn increment before reputation is fetched', async () => {
      await investigateReputation();

      expect(commit.getCall(1)).to.have.been.calledWithExactly('INCREMENT_GAME_TURN');
    });

    it('should start fetching reputation', async () => {
      await investigateReputation();

      expect(dataService.fetchReputation).to.have.been.called;
    });

    it('should commit reputation payload after reputation is fetched successfully', async () => {
      await investigateReputation();

      expect(commit.getCall(2)).to.have.been.calledWithExactly(
        'STORE_REPUTATION',
        reputation
      );
    });

    it('should start fetching ads after game is fetched successfully', async () => {
      await investigateReputation();

      expect(dataService.fetchAds).to.have.been.calledWith(game.gameId);
    });

    it('should commit ads payload after ads are fetched successfully', async () => {
      await investigateReputation();

      expect(commit.getCall(3)).to.have.been.calledWithExactly('STORE_ADS', readableAds);
    });

    it('should commit game loading status after ads are fetched successfully', async () => {
      await investigateReputation();

      expect(commit.getCall(4)).to.have.been.calledWithExactly(
        'STORE_GAME_LOADING_STATUS',
        { status: LoadStatus.Success }
      );
    });

    it('should commit game loading status after reputation is fetched unsuccessfully', async () => {
      const e = Error('foo');
      const expectedPayload = {
        status: LoadStatus.Fail,
        e
      };

      dataService.fetchReputation.rejects(e);

      await investigateReputation();

      expect(commit.getCall(2)).to.have.been.calledWith(
        'STORE_GAME_LOADING_STATUS',
        sinon.match(expectedPayload)
      );
    });

    it('should commit game loading status after ads are fetched unsuccessfully', async () => {
      const e = Error('foo');
      const expectedPayload = {
        status: LoadStatus.Fail,
        e
      };

      dataService.fetchAds.rejects(e);

      await investigateReputation();

      expect(commit.getCall(3)).to.have.been.calledWith(
        'STORE_GAME_LOADING_STATUS',
        sinon.match(expectedPayload)
      );
    });
  });
});
