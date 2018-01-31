import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import routes from './routes';
import map from './map';
import popup from './popup';

export default combineReducers({
  router: routerReducer,
  map,
  routes,
  popup
});
