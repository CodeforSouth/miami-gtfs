import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import routes from 'reducers/routes';
import trips from 'reducers/trips';

export default combineReducers({
  router: routerReducer,
  routes,
  trips,
});
