import Vuex from 'vuex';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import sinon from 'sinon';
import Game from './Game.vue';
import LoadStatus from '../constants';
import DmAdCard from '../components/ad-card/AdCard.vue';
import DmGameStats from '../components/game-stats/GameStats.vue';
import DmItemShop from '../components/item-shop/ItemShop.vue';
import DmReputation from '../components/reputation/Reputation.vue';
import ads from '../../../../test/fixtures/ads.json';
import game from '../../../../test/fixtures/game.json';
import gameReputation from '../../../../test/fixtures/reputation.json';
import shopItems from '../../../../test/fixtures/shopItems.json';

const localVue = createLocalVue();
const sandbox = sinon.createSandbox();

localVue.use(Vuex);

const actions = {
  buyItem: sandbox.spy(),
  investigateReputation: sandbox.spy(),
  solveAd: sandbox.spy()
};

const createMockedStore = (status = LoadStatus.Success) =>
  new Vuex.Store({
    modules: {
      game: {
        namespaced: true,
        state: {
          ads,
          game,
          items: shopItems,
          reputation: gameReputation,
          status
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
  const { gameId } = game;

  afterEach(() => {
    sandbox.restore();
  });

  it('should pass game stats to game stats component', () => {
    const statsRef = reusableWrapper.find(DmGameStats);
    const { stats } = statsRef.props();

    expect(stats).to.equal(game);
  });

  it('should pass gold amount to item shop component', () => {
    const shopRef = reusableWrapper.find(DmItemShop);
    const { gold } = shopRef.props();

    expect(gold).to.equal(game.gold);
  });

  it('should pass items to item shop component', () => {
    const shopRef = reusableWrapper.find(DmItemShop);
    const { items } = shopRef.props();

    expect(items).to.be.an('array');
    expect(items).to.have.lengthOf(items.length);
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
      gameId,
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

  it('should trigger item buying action', () => {
    const shopRef = reusableWrapper.find(DmItemShop);
    const itemId = 'foo';

    shopRef.vm.$emit('item-buy', itemId);

    expect(actions.buyItem.getCall(0).args[1]).to.deep.equal({
      gameId,
      itemId
    });
  });

  it('should pass reputation to reputation component', () => {
    const reputationRef = reusableWrapper.find(DmReputation);
    const { reputation } = reputationRef.props();

    expect(reputation).to.equal(gameReputation);
  });

  it('should trigger reputation investigation action', () => {
    const reputationRef = reusableWrapper.find(DmReputation);

    reputationRef.vm.$emit('refresh-reputation');

    expect(actions.investigateReputation.getCall(0).args[1]).to.deep.equal(gameId);
  });
});
