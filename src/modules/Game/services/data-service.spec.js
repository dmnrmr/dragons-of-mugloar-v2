import sinon from 'sinon';

const dataServiceInjector = require('inject-loader!./data-service.js'); // eslint-disable-line

const sandbox = sinon.createSandbox();
const axiosGetSpy = sandbox.spy();
const axiosPostSpy = sandbox.spy();

const dataService = dataServiceInjector({
  axios: {
    create: () => ({
      get: axiosGetSpy,
      post: axiosPostSpy
    })
  }
});

describe('Data service', () => {
  afterEach(() => {
    sandbox.resetHistory();
  });

  describe('Fetch game', () => {
    it('should send a post request to start a game', () => {
      dataService.fetchGame();

      expect(axiosPostSpy).to.have.been.calledWithExactly('/api/v2/game/start');
    });
  });

  describe('Fetch ads', () => {
    it('should send a get request to fetch ads', () => {
      const gameId = 'foo';

      dataService.fetchAds(gameId);

      expect(axiosGetSpy).to.have.been.calledWithExactly(`/api/v2/${gameId}/messages`);
    });
  });

  describe('Fetch shop items', () => {
    it('should send a get request to fetch items', () => {
      const gameId = 'foo';

      dataService.fetchItems(gameId);

      expect(axiosGetSpy).to.have.been.calledWithExactly(`/api/v2/${gameId}/shop`);
    });
  });

  describe('Fetch solve ad', () => {
    it('should send a post request to solve game', () => {
      const gameId = 'foo';
      const adId = 'bar';

      dataService.fetchSolveAd(gameId, adId);

      expect(axiosPostSpy).to.have.been.calledWithExactly(
        `/api/v2/${gameId}/solve/${adId}`
      );
    });
  });

  describe('Fetch buy an item', () => {
    it('should send a post request to buy an item', () => {
      const gameId = 'foo';
      const itemId = 'bar';

      dataService.fetchBuyItem(gameId, itemId);

      expect(axiosPostSpy).to.have.been.calledWithExactly(
        `/api/v2/${gameId}/shop/buy/${itemId}`
      );
    });
  });
});
