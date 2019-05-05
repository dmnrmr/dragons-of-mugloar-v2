import sinon from 'sinon';

const notificationInjector = require('inject-loader!./notification'); // eslint-disable-line

const Vue = {
  notify: () => {}
};

const notification = notificationInjector({
  vue: Vue
});

describe('Notification service', () => {
  const sandbox = sinon.createSandbox();
  const defaultPayload = {
    text: 'Fusce rutrum magna vehicula risus facilisis, finibus feugiat amet.',
    duration: 750
  };

  beforeEach(() => {
    sandbox.spy(Vue, 'notify');
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('Info', () => {
    it('should emit info type notification', () => {
      notification.default.info(defaultPayload.text);

      expect(Vue.notify).to.have.been.calledWithExactly({
        ...defaultPayload,
        type: 'is-info'
      });
    });
  });

  describe('Success', () => {
    it('should emit success type notification', () => {
      notification.default.success(defaultPayload.text);

      expect(Vue.notify).to.have.been.calledWithExactly({
        ...defaultPayload,
        type: 'is-success'
      });
    });
  });

  describe('Error', () => {
    it('should emit error type notification', () => {
      notification.default.error(defaultPayload.text);

      expect(Vue.notify).to.have.been.calledWithExactly({
        ...defaultPayload,
        type: 'is-danger'
      });
    });
  });
});
