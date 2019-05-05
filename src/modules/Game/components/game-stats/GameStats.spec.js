import { shallowMount } from '@vue/test-utils';
import GameStats from './GameStats.vue';
import game from '../../../../../test/fixtures/game.json';

describe('AdCard component', () => {
  const wrapper = shallowMount(GameStats, {
    propsData: { stats: game }
  });

  it('should render only visible game stats', () => {
    const statRefArray = wrapper.findAll('.stat');

    expect(statRefArray).to.have.lengthOf(6);
  });

  it('should render number of lives', () => {
    const statRef = wrapper.find('.stat--lives');

    expect(statRef.text()).to.equal(String(game.lives));
  });

  it('should render amount of gold', () => {
    const statRef = wrapper.find('.stat--gold');

    expect(statRef.text()).to.equal(String(game.gold));
  });

  it('should render current level', () => {
    const statRef = wrapper.find('.stat--level');

    expect(statRef.text()).to.equal(String(game.level));
  });

  it('should render current score', () => {
    const statRef = wrapper.find('.stat--score');

    expect(statRef.text()).to.equal(String(game.score));
  });

  it('should render highest score', () => {
    const statRef = wrapper.find('.stat--highScore');

    expect(statRef.text()).to.equal(String(game.highScore));
  });

  it('should render current turn', () => {
    const statRef = wrapper.find('.stat--turn');

    expect(statRef.text()).to.equal(String(game.turn));
  });
});
