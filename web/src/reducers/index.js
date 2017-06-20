import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import routes from 'reducers/routes';

export default combineReducers({
  router: routerReducer,
  routes,
});
