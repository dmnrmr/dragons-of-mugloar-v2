import { shallowMount } from '@vue/test-utils';
import GameStats from './GameStats.vue';
import game from '../../../../../test/fixtures/game.json';

describe('Game stats component', () => {
  const wrapper = shallowMount(GameStats, {
    propsData: {
      stats: game
    },
    slots: {
      default: '<div class="foo-slot-content"></div>'
    }
  });

  it('should render only visible game stats', () => {
    const statRefArray = wrapper.findAll('.stats__stat');

    expect(statRefArray).to.have.lengthOf(5);
  });

  it('should render number of lives', () => {
    const statRef = wrapper.find('.stats__stat--lives');

    expect(statRef.text()).to.equal(String(game.lives));
  });

  it('should render amount of gold', () => {
    const statRef = wrapper.find('.stats__stat--gold');

    expect(statRef.text()).to.equal(String(game.gold));
  });

  it('should render current level', () => {
    const statRef = wrapper.find('.stats__stat--level');

    expect(statRef.text()).to.equal(String(game.level));
  });

  it('should render current score', () => {
    const statRef = wrapper.find('.stats__stat--score');

    expect(statRef.text()).to.equal(String(game.score));
  });

  it('should render current turn', () => {
    const statRef = wrapper.find('.stats__stat--turn');

    expect(statRef.text()).to.equal(String(game.turn));
  });

  it('should render content in a slot', () => {
    const slotContentRef = wrapper.find('.foo-slot-content');

    expect(slotContentRef.exists()).to.be.true;
  });
});
