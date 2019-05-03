import { shallowMount } from '@vue/test-utils';
import AnchorButton from './AnchorButton.vue';

describe('AnchorButton component', () => {
  const wrapper = shallowMount(AnchorButton, {
    propsData: {
      to: 'foo',
      text: 'bar'
    },
    stubs: ['router-link']
  });

  it('should pass correct data to `router-link`', () => {
    const stub = wrapper.find('router-link-stub');

    expect(stub.attributes().to).to.equal('foo');
    expect(stub.text()).to.equal('bar');
  });
});
