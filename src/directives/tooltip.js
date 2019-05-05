import tippy from 'tippy.js';

export default {
  bind: (element, { value: content }) => {
    tippy(element, {
      animateFill: false,
      animation: 'fade',
      content
    });
  }
};
