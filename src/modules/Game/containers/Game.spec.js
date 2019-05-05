import Vuex from 'vuex';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import sinon from 'sinon';
import Game from './Game.vue';
import LoadStatus from '../constants';
import DmGameStats from '../components/game-stats/GameStats.vue';
import DmAdCard from '../components/ad-card/AdCard.vue';
import game from '../../../../test/fixtures/game.json';
import ads from '../../../../test/fixtures/ads.json';

const localVue = createLocalVue();
localVue.use(Vuex);

const createMockedStore = (status = LoadStatus.Success) =>
  new Vuex.Store({
    modules: {
      game: {
        namespaced: true,
        state: {
          status,
          game,
          ads
        }
      }
    }
  });

describe('Game page component', () => {
  const sandbox = sinon.createSandbox();
  const wrapper = shallowMount(Game, {
    localVue,
    store: createMockedStore()
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('Game stats', () => {
    it('should pass game stats to game stats component', () => {
      const statsRef = wrapper.find(DmGameStats);
      const { stats } = statsRef.props();

      expect(stats).to.equal(game);
    });
  });

  describe('Ad list', () => {
    it('should render ad list', () => {
      const adCardRefArray = wrapper.findAll(DmAdCard);

      expect(adCardRefArray).to.have.lengthOf(ads.length);
    });

    it('should pass ad to ad card component', () => {
      const adCardRef = wrapper.find(DmAdCard);
      const { ad: adList } = adCardRef.props();

      expect(adList).to.equal(ads[0]);
    });

    it('should take action on an ad', () => {
      const adCardRef = wrapper.find(DmAdCard);
      const consoleLogSpy = sandbox.spy(console, 'log');
      const adId = 'foo';

      adCardRef.vm.$emit('ad-take-action', adId);

      expect(consoleLogSpy).to.have.been.calledWith('** Ad take action on', adId);
    });
  });

  describe('Game error', () => {
    const wrapper2 = shallowMount(Game, {
      localVue,
      store: createMockedStore(LoadStatus.Fail)
    });

    it('should render error if game loading status was not a success', () => {
      const errorRef = wrapper2.find('.game-load-error');

      expect(errorRef.text()).to.equal('There was an error loading game.');
    });
  });
});
