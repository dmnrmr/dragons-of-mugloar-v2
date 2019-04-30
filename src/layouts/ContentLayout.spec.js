import { shallowMount } from '@vue/test-utils';
import ContentLayout from './ContentLayout.vue';

describe('Icon component', () => {
  const wrapper = shallowMount(ContentLayout, {
    slots: {
      default: '<div class="page-content"></div>'
    },
    stubs: ['router-link']
  });

  it('should render content into the slot', () => {
    expect(wrapper.findAll('.page-content').length).toBe(1);
  });
});
