import { shallowMount } from '@vue/test-utils';
import Icon from './Icon.vue';

describe('Icon component', () => {
  const wrapper = shallowMount(Icon, {
    propsData: {
      name: 'arrow-left',
      size: 'sm'
    },
    stubs: ['simple-svg']
  });

  it('should pass correct data to `simple-svg`', () => {
    const stub = wrapper.find('simple-svg-stub');

    expect(stub.attributes()).toEqual({
      filepath: './assets/icons/keyboard_arrow_left.svg',
      width: '36px',
      height: '36px'
    });
  });
});
