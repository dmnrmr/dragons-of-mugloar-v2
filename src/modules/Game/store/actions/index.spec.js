import sinon from 'sinon';
import ads from '../../../../../test/fixtures/ads.json';
import boughItemUpdate from '../../../../../test/fixtures/buyItem.json';
import game from '../../../../../test/fixtures/game.json';
import items from '../../../../../test/fixtures/shopItems.json';
import solvedAdUpdate from '../../../../../test/fixtures/solveAd.json';
import LoadStatus from '../../constants';

const actionsInjector = require('inject-loader!./index'); // eslint-disable-line

const dataService = {
  fetchAds: () => {},
  fetchBuyItem: () => {},
  fetchGame: () => {},
  fetchItems: () => {},
  fetchSolveAd: () => {}
};
const notificationService = {
  success: () => {},
  error: () => {}
};

const actions = actionsInjector({
  '../../services/data-service': dataService,
  '../../../../services/notification': notificationService
});

describe('Game actions', () => {
  const sandbox = sinon.createSandbox();
  const commit = sandbox.spy();

  beforeEach(() => {
    sandbox.stub(dataService, 'fetchGame').resolves({ data: game });
    sandbox.stub(dataService, 'fetchAds').resolves({ data: ads });
    sandbox.stub(dataService, 'fetchItems').resolves({ data: items });
    sandbox.stub(dataService, 'fetchSolveAd').resolves({ data: solvedAdUpdate });
    sandbox.stub(dataService, 'fetchBuyItem').resolves({ data: boughItemUpdate });
    sandbox.spy(notificationService, 'success');
    sandbox.spy(notificationService, 'error');
  });

  afterEach(() => {
    sandbox.restore();
    commit.resetHistory();
  });

  describe('Start game', () => {
    const startGame = () => actions.startGame({ commit });

    it('should commit game loading status before game is fetched', async () => {
      await startGame();

      expect(commit.getCall(0)).to.have.been.calledWithExactly(
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

      expect(commit.getCall(1)).to.have.been.calledWithExactly('STORE_GAME', game);
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

      expect(commit.getCall(2)).to.have.been.calledWithExactly('STORE_ADS', ads);
    });

    it('should commit decoded ads after they are fetched successfully', async () => {
      const [ad, ...otherAds] = ads;
      const { adId, message, probability } = ad;
      const encryptedAd = {
        ...ad,
        adId: btoa(adId),
        encrypted: true,
        message: btoa(message),
        probability: btoa(probability)
      };

      dataService.fetchAds.resolves({ data: [encryptedAd, ...otherAds] });

      await startGame();

      expect(commit.getCall(2)).to.have.been.calledWithExactly('STORE_ADS', [
        {
          ...ad,
          encrypted: true
        },
        ...otherAds
      ]);
    });

    it('should commit shop items payload after items are fetched successfully', async () => {
      await startGame();

      expect(commit.getCall(3)).to.have.been.calledWithExactly('STORE_ITEMS', items);
    });

    it('should commit game loading status after ads and shop items are fetched successfully', async () => {
      await startGame();

      expect(commit.getCall(4)).to.have.been.calledWithExactly(
        'STORE_GAME_LOADING_STATUS',
        { status: LoadStatus.Success }
      );
    });

    it('should commit game loading status after game is fetched unsuccessfully', async () => {
      dataService.fetchGame.rejects();

      await startGame();

      expect(commit.getCall(1)).to.have.been.calledWithExactly(
        'STORE_GAME_LOADING_STATUS',
        { status: LoadStatus.Fail }
      );
    });

    it('should commit game loading status after ads are fetched unsuccessfully', async () => {
      dataService.fetchAds.rejects();

      await startGame();

      expect(commit.getCall(3)).to.have.been.calledWithExactly(
        'STORE_GAME_LOADING_STATUS',
        { status: LoadStatus.Fail }
      );
    });

    it('should commit game loading status after shop items are fetched unsuccessfully', async () => {
      dataService.fetchItems.rejects();

      await startGame();

      expect(commit.getCall(3)).to.have.been.calledWithExactly(
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

      expect(commit.getCall(2)).to.have.been.calledWithExactly('STORE_ADS', ads);
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

      expect(commit.getCall(2)).to.have.been.calledWithExactly('STORE_ADS', ads);
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
});
