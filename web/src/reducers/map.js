import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { createActions } from 'lib/actions';

const mutations = ['zoom', 'loaded'];

export const { types, actions } = createActions(mutations, 'map');

function zoom(state = [12], { type, payload }) {
  switch (type) {
    case types.zoom:
      return payload;
    default:
      return state;
  }
}

function loaded(state = false, { type, payload }) {
  switch (type) {
    case types.loaded:
      return true;
    default:
      return state;
  }
}

export default combineReducers({
  zoom,
  loaded
});

const visible = {
  visibility: 'visible'
};

const hidden = {
  visibility: 'none'
};

export const symbolVisibility = createSelector(
  state => state.map.zoom[0],
  zoom => {
    if (zoom > 15.5) {
      return visible;
    }
    return hidden;
  }
);

const large = {
  'circle-radius': 5,
  'circle-stroke-width': 1
};

const medium = {
  'circle-radius': 2,
  'circle-stroke-width': 1
};

const small = {
  'circle-radius': 1,
  'circle-stroke-width': 1
};

export const circleSize = createSelector(
  state => state.map.zoom[0],
  zoom => {
    if (zoom > 14) {
      return large;
    } else if (zoom > 12) {
      return medium;
    }
    return small;
  }
);
