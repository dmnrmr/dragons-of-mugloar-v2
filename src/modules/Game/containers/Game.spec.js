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
const sandbox = sinon.createSandbox();

localVue.use(Vuex);

const actions = {
  solveAd: sandbox.spy()
};

const createMockedStore = (status = LoadStatus.Success) =>
  new Vuex.Store({
    modules: {
      game: {
        namespaced: true,
        state: {
          status,
          game,
          ads
        },
        actions
      }
    }
  });

describe('Game page component', () => {
  const reusableWrapper = shallowMount(Game, {
    localVue,
    store: createMockedStore()
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should pass game stats to game stats component', () => {
    const statsRef = reusableWrapper.find(DmGameStats);
    const { stats } = statsRef.props();

    expect(stats).to.equal(game);
  });

  it('should render ad list', () => {
    const adCardRefArray = reusableWrapper.findAll(DmAdCard);

    expect(adCardRefArray).to.have.lengthOf(ads.length);
  });

  it('should pass ad to ad card component', () => {
    const adCardRef = reusableWrapper.find(DmAdCard);
    const { ad: adList } = adCardRef.props();

    expect(adList).to.equal(ads[0]);
  });

  it('should trigger ad solving action', () => {
    const adCardRef = reusableWrapper.find(DmAdCard);
    const adId = 'foo';

    adCardRef.vm.$emit('ad-solve', adId);

    expect(actions.solveAd.getCall(0).args[1]).to.deep.equal({
      gameId: game.gameId,
      adId
    });
  });

  it('should render error if game loading status was not a success', () => {
    const wrapper = shallowMount(Game, {
      localVue,
      store: createMockedStore(LoadStatus.Fail)
    });
    const errorRef = wrapper.find('.game-load-error');

    expect(errorRef.text()).to.equal('There was an error loading game.');
  });

  it('should not add `game--is-loading` class if game is not loading', () => {
    const gameRef = reusableWrapper.find('.game');

    expect(gameRef.classes()).not.to.contain('game--is-loading');
  });

  it('should add `game--is-loading` class if game is loading', () => {
    const wrapper = shallowMount(Game, {
      localVue,
      store: createMockedStore(LoadStatus.Loading)
    });
    const gameRef = wrapper.find('.game');

    expect(gameRef.classes()).to.contain('game--is-loading');
  });
});
