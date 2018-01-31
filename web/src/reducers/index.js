import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import routes from './routes';
import map from './map';

export default combineReducers({
  router: routerReducer,
  map,
  routes
});
