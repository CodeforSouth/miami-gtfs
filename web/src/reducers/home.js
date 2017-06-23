import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import Immutable from 'immutable';
import routesFuse from 'lib/search/routes';

const prefix = 'home/';
export const home = {
  fetch: `${prefix}fetch`,
  set: `${prefix}set`,
  filter: `${prefix}filter`,
  error: `${prefix}error`,
};

export function fetch() {
  return {
    type: home.fetch,
  };
}

export function set(payload) {
  return {
    type: home.set,
    payload,
  };
}

export function filterRoutes(payload) {
  return {
    type: home.filter,
    payload,
  };
}

function routes(state = Immutable.OrderedMap(), action = {}) {
  switch (action.type) {
    case home.set:
      return action.payload.routes;
    default:
      return state;
  }
}

function filter(state = '', action = {}) {
  switch (action.type) {
    case home.filter:
      return action.payload;
    default:
      return state;
  }
}

function stops(state = Immutable.Map(), action = {}) {
  switch (action.type) {
    case home.set:
      return action.payload.stops;
    default:
      return state;
  }
}

function stopsJSON(state = null, action = {}) {
  switch (action.type) {
    case home.set:
      return action.payload.stopsJSON;
    default:
      return state;
  }
}

export default combineReducers({
  routes,
  filter,
  stops,
  stopsJSON,
});

export const routesArray = createSelector(
  state => state.home.routes,
  state => state.home.filter,
  (list, filter) => {
    if (filter.length) {
      return routesFuse.search(filter);
    }
    return list.toArray();
  }
);
