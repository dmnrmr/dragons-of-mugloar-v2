require('jsdom-global')();

const chai = require('chai');
const sinonChai = require('sinon-chai');
const Vue = require('vue');

chai.use(sinonChai);

global.expect = chai.expect;

window.Date = Date;

Vue.config.productionTip = false;
Vue.config.devtools = false;
Vue.config.silent = true;
