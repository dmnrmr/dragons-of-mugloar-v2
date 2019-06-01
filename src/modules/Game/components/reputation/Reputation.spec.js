import { shallowMount } from '@vue/test-utils';
import Reputation from './Reputation.vue';
import DmBrightness from '../../../../components/icons/brightness.svg';
import DmLocationCity from '../../../../components/icons/location_city.svg';
import DmSupervisorAccount from '../../../../components/icons/supervisor_account.svg';
import reputation from '../../../../../test/fixtures/reputation.json';

describe('Reputation component', () => {
  const wrapper = shallowMount(Reputation, {
    propsData: { reputation }
  });

  it(`should render people's reputation`, () => {
    const reputationRef = wrapper.find('.reputation__list-item--people');

    expect(reputationRef.text()).to.equal('1.00');
  });

  it(`should render people's reputation icon`, () => {
    const reputationRef = wrapper.find('.reputation__list-item--people');
    const icon = reputationRef.find(DmSupervisorAccount);

    expect(icon.is(DmSupervisorAccount)).to.be.true;
  });

  it(`should render states's reputation`, () => {
    const reputationRef = wrapper.find('.reputation__list-item--state');

    expect(reputationRef.text()).to.equal('0.00');
  });

  it(`should render states's reputation icon`, () => {
    const reputationRef = wrapper.find('.reputation__list-item--state');
    const icon = reputationRef.find(DmLocationCity);

    expect(icon.is(DmLocationCity)).to.be.true;
  });

  it(`should render underworlds's reputation`, () => {
    const reputationRef = wrapper.find('.reputation__list-item--underworld');

    expect(reputationRef.text()).to.equal('0.00');
  });

  it(`should render underworlds's reputation icon`, () => {
    const reputationRef = wrapper.find('.reputation__list-item--underworld');
    const icon = reputationRef.find(DmBrightness);

    expect(icon.is(DmBrightness)).to.be.true;
  });

  it('should emit event when trying to refresh reputation', () => {
    wrapper.find('.reputation__action').trigger('click');

    const [event] = wrapper.emitted()['refresh-reputation'];

    expect(event).to.be.an('array').that.is.empty;
  });
});
