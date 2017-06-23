import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import routes from 'reducers/routes';
import trips from 'reducers/trips';
import stops from 'reducers/stops';

export default combineReducers({
  router: routerReducer,
  routes,
  trips,
  stops,
});
