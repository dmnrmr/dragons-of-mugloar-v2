import Vue from 'vue';

const notify = (type, text) => {
  Vue.notify({
    type,
    text,
    duration: 750
  });
};

export default {
  info: text => {
    notify('is-info', text);
  },
  success: text => {
    notify('is-success', text);
  },
  error: text => {
    notify('is-danger', text);
  }
};
