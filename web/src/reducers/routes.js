import { combineReducers } from 'redux';
import Immutable from 'immutable';

const prefix = 'routes/';
export const routes = {
  fetch: `${prefix}fetch`,
  set: `${prefix}set`,
  error: `${prefix}error`,
};

export function fetchRoutes() {
  return {
    type: routes.fetch,
  };
}

export function setRoutes(payload) {
  return {
    type: routes.set,
    payload,
  };
}

export function routesError(payload) {
  return {
    type: routes.error,
    payload,
  };
}

function list(state = Immutable.OrderedMap(), action = {}) {
  switch (action.type) {
    case routes.set:
      return action.payload;
    default:
      return state;
  }
}

function error(state = null, action = {}) {
  switch (action.type) {
    case routes.error:
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  list,
  error,
});
