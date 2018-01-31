import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

var jsdom = require('jsdom').jsdom;
global.document = jsdom('');
global.window = document.defaultView;
global.navigator = window.navigator;
window.localStorage = window.sessionStorage = {
  getItem: function(key) {
    return this[key];
  },
  setItem: function(key, value) {
    this[key] = value;
  }
};
