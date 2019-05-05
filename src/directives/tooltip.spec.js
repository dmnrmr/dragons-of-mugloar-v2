import sinon from 'sinon';
import { createLocalVue, shallowMount } from '@vue/test-utils';

const sandbox = sinon.createSandbox();
const tippy = sandbox.spy();

const tooltipInjector = require('inject-loader!./tooltip'); // eslint-disable-line
const tooltip = tooltipInjector({
  'tippy.js': tippy
});

const localVue = createLocalVue();
localVue.directive('tooltip', tooltip.default);

describe('Tooltip directive', () => {
  const tooltipContent = 'Foo';
  const DummyComponent = localVue.component('dummy', {
    template: '<div v-tooltip="tooltipContent"></div>',
    data: () => ({ tooltipContent })
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should instantiate tippy on bind', () => {
    const wrapper = shallowMount(DummyComponent, { localVue });

    expect(tippy).to.have.been.calledWithExactly(wrapper.vm.$el, {
      animateFill: false,
      animation: 'fade',
      content: tooltipContent
    });
  });
});
