import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import home from 'reducers/home';
import map from 'reducers/map';

export default combineReducers({
  router: routerReducer,
  home,
  map,
});
