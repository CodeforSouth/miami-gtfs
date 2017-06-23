import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import Immutable from 'immutable';
import { routes } from 'reducers/routes';

const prefix = 'stops/';
export const stops = {
  fetch: `${prefix}fetch`,
  set: `${prefix}set`,
  error: `${prefix}error`,
};

function data(state = Immutable.OrderedMap(), action = {}) {
  switch (action.type) {
    case routes.set:
      return state.merge(action.payload.stops);
    default:
      return state;
  }
}

export default combineReducers({
  data,
});

export const stopSelector = createSelector(
  state => state.stops.data,
  data => data.toArray()
);
