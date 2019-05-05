import { shallowMount } from '@vue/test-utils';
import AdCard from './AdCard.vue';
import ads from '../../../../../test/fixtures/ads.json';

const [ad] = ads;

const getAdWithProbability = probability => ({
  ...ad,
  probability
});

describe('AdCard component', () => {
  const wrapper = shallowMount(AdCard, {
    propsData: { ad }
  });

  describe('Probability tag', () => {
    it('should render "unknown" probability tag without color class name', () => {
      wrapper.setProps({ ad: getAdWithProbability('unknown') });

      const tagRef = wrapper.find('.tag');

      expect(tagRef.classes())
        .to.have.lengthOf(1)
        .and.to.contain('tag');
    });

    it('should render "Sure thing" probability tag with correct color class name', () => {
      wrapper.setProps({ ad: getAdWithProbability('Sure thing') });

      const tagRef = wrapper.find('.tag');

      expect(tagRef.classes()).to.contain('is-light');
    });

    it('should render "Piece of cake" probability tag with correct color class name', () => {
      wrapper.setProps({ ad: getAdWithProbability('Piece of cake') });

      const tagRef = wrapper.find('.tag');

      expect(tagRef.classes()).to.contain('is-info');
    });

    it('should render "Quite likely" probability tag with correct color class name', () => {
      wrapper.setProps({ ad: getAdWithProbability('Quite likely') });

      const tagRef = wrapper.find('.tag');

      expect(tagRef.classes()).to.contain('is-link');
    });

    it('should render "Walk in the park" probability tag with correct color class name', () => {
      wrapper.setProps({ ad: getAdWithProbability('Walk in the park') });

      const tagRef = wrapper.find('.tag');

      expect(tagRef.classes()).to.contain('is-primary');
    });

    it('should render "Gamble" probability tag with correct color class name', () => {
      wrapper.setProps({ ad: getAdWithProbability('Gamble') });

      const tagRef = wrapper.find('.tag');

      expect(tagRef.classes()).to.contain('is-success');
    });

    it('should render "Risky" probability tag with correct color class name', () => {
      wrapper.setProps({ ad: getAdWithProbability('Risky') });

      const tagRef = wrapper.find('.tag');

      expect(tagRef.classes()).to.contain('is-warning');
    });

    it('should render "Playing with fire" probability tag with correct color class name', () => {
      wrapper.setProps({ ad: getAdWithProbability('Playing with fire') });

      const tagRef = wrapper.find('.tag');

      expect(tagRef.classes()).to.contain('is-danger');
    });

    it('should render "Hmmm...." probability tag with correct color class name', () => {
      wrapper.setProps({ ad: getAdWithProbability('Hmmm....') });

      const tagRef = wrapper.find('.tag');

      expect(tagRef.classes()).to.contain('is-dark');
    });

    it('should render "Suicide mission" probability tag with correct color class name', () => {
      wrapper.setProps({ ad: getAdWithProbability('Suicide mission') });

      const tagRef = wrapper.find('.tag');

      expect(tagRef.classes()).to.contain('is-black');
    });
  });

  describe('Reward', () => {
    it('should render rewards from props', () => {
      const rewardRef = wrapper.find('.dm-ad-reward');

      expect(rewardRef.text()).to.equal(String(ad.reward));
    });
  });

  describe('Expires in', () => {
    it('should render expires in from props', () => {
      const rewardRef = wrapper.find('.dm-ad-expires');

      expect(rewardRef.text()).to.equal(String(ad.expiresIn));
    });
  });

  describe('Message', () => {
    it('should render message from props', () => {
      const rewardRef = wrapper.find('.dm-ad-message');

      expect(rewardRef.text()).to.equal(String(ad.message));
    });
  });

  describe('Solve', () => {
    it('should emit event with ad id when taking action', () => {
      wrapper.find('.dm-ad-solve').trigger('click');

      const [[event]] = wrapper.emitted()['ad-solve'];

      expect(event).to.equal(ad.adId);
    });
  });
});
