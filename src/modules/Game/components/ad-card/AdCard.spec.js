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
    it('should render "Sure thing" probability tag', () => {
      const probability = 'Sure thing';

      wrapper.setProps({ ad: getAdWithProbability(probability) });

      const tagRef = wrapper.find('.tag');

      expect(tagRef.classes()).to.contain('is-info');
      expect(tagRef.text()).to.be.equal(probability);
    });

    it('should render "Piece of cake" probability tag', () => {
      const probability = 'Piece of cake';

      wrapper.setProps({ ad: getAdWithProbability(probability) });

      const tagRef = wrapper.find('.tag');

      expect(tagRef.classes()).to.contain('is-info');
      expect(tagRef.text()).to.be.equal(probability);
    });

    it('should render "Walk in the park" probability tag', () => {
      const probability = 'Walk in the park';

      wrapper.setProps({ ad: getAdWithProbability(probability) });

      const tagRef = wrapper.find('.tag');

      expect(tagRef.classes()).to.contain('is-success');
      expect(tagRef.text()).to.be.equal(probability);
    });

    it('should render "Hmmm...." probability tag with correct color class name', () => {
      const probability = 'Hmmm....';

      wrapper.setProps({ ad: getAdWithProbability(probability) });

      const tagRef = wrapper.find('.tag');

      expect(tagRef.classes()).to.contain('is-success');
      expect(tagRef.text()).to.be.equal(probability);
    });

    it('should render "Quite likely" probability tag', () => {
      const probability = 'Quite likely';

      wrapper.setProps({ ad: getAdWithProbability(probability) });

      const tagRef = wrapper.find('.tag');

      expect(tagRef.classes()).to.contain('is-success');
      expect(tagRef.text()).to.be.equal(probability);
    });

    it('should render "Gamble" probability tag', () => {
      const probability = 'Gamble';

      wrapper.setProps({ ad: getAdWithProbability(probability) });

      const tagRef = wrapper.find('.tag');

      expect(tagRef.classes()).to.contain('is-warning');
      expect(tagRef.text()).to.be.equal(probability);
    });

    it('should render "Risky" probability tag', () => {
      const probability = 'Risky';

      wrapper.setProps({ ad: getAdWithProbability(probability) });

      const tagRef = wrapper.find('.tag');

      expect(tagRef.classes()).to.contain('is-danger');
      expect(tagRef.text()).to.be.equal(probability);
    });

    it('should render "Rather detrimental" probability tag', () => {
      const probability = 'Rather detrimental';

      wrapper.setProps({ ad: getAdWithProbability(probability) });

      const tagRef = wrapper.find('.tag');

      expect(tagRef.classes()).to.contain('is-danger');
      expect(tagRef.text()).to.be.equal(probability);
    });

    it('should render "Playing with fire" probability tag with correct color class name', () => {
      const probability = 'Playing with fire';

      wrapper.setProps({ ad: getAdWithProbability(probability) });

      const tagRef = wrapper.find('.tag');

      expect(tagRef.classes()).to.contain('is-black');
      expect(tagRef.text()).to.be.equal(probability);
    });

    it('should render "Suicide mission" probability tag', () => {
      const probability = 'Suicide mission';

      wrapper.setProps({ ad: getAdWithProbability(probability) });

      const tagRef = wrapper.find('.tag');

      expect(tagRef.classes()).to.contain('is-black');
      expect(tagRef.text()).to.be.equal(probability);
    });

    it('should render "Impossible" probability tag', () => {
      const probability = 'Impossible';

      wrapper.setProps({ ad: getAdWithProbability(probability) });

      const tagRef = wrapper.find('.tag');

      expect(tagRef.classes()).to.contain('is-light');
      expect(tagRef.text()).to.be.equal(probability);
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
