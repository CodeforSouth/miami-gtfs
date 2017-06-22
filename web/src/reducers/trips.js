import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import Immutable from 'immutable';

const prefix = 'trips/';
export const trips = {
  fetch: `${prefix}fetch`,
  set: `${prefix}set`,
  error: `${prefix}error`,
};

export function fetchTrips(payload) {
  return {
    type: trips.fetch,
    payload,
  };
}

export function setTrips(payload) {
  return {
    type: trips.set,
    payload,
  };
}

export function tripsError(payload) {
  return {
    type: trips.error,
    payload,
  };
}

function data(state = Immutable.Map(), action = {}) {
  switch (action.type) {
    case trips.set:
      return action.payload;
    default:
      return state;
  }
}

function error(state = null, action = {}) {
  switch (action.type) {
    case trips.error:
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  data,
  error,
});
