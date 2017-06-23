import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import Immutable from 'immutable';
import routesFuse from 'lib/search/routes';

const prefix = 'routes/';
export const routes = {
  fetch: `${prefix}fetch`,
  set: `${prefix}set`,
  error: `${prefix}error`,
  filter: `${prefix}filter`,
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

export function filterRoutes(payload) {
  return {
    type: routes.filter,
    payload,
  };
}

function list(state = Immutable.OrderedMap(), action = {}) {
  switch (action.type) {
    case routes.set:
      return action.payload.routes;
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

function filter(state = '', action = {}) {
  switch (action.type) {
    case routes.filter:
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  list,
  error,
  filter,
});

export const allRoutes = createSelector(
  state => state.routes.list,
  state => state.routes.filter,
  (list, filter) => {
    if (filter.length) {
      return routesFuse.search(filter);
    }
    return list.toArray();
  }
);
