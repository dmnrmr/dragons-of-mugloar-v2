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
  describe('Fetch game', () => {
    it('should send a post request to start a game', () => {
      dataService.fetchGame();

      expect(axiosPostSpy).to.have.been.calledWith('/api/v2/game/start');
    });
  });

  describe('Fetch messages', () => {
    it('should send a get request to fetch ads', () => {
      const gameId = 'foo';

      dataService.fetchAds(gameId);

      expect(axiosGetSpy).to.have.been.calledWith(`/api/v2/${gameId}/messages`);
    });
  });
});
