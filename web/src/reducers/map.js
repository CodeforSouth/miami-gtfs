import { combineReducers } from 'redux';
import { createSelector } from 'reselect';

const prefix = 'map/';
export const map = {
  zoom: `${prefix}zoom`,
  loaded: `${prefix}loaded`,
};

export function setZoom(payload) {
  return {
    type: map.zoom,
    payload,
  };
}

export function setLoaded() {
  return {
    type: map.loaded,
  };
}

function zoom(state = [11], action = {}) {
  if (action.type === map.zoom) {
    return action.payload;
  }
  return state;
}

function loaded(state = false, action = {}) {
  if (action.type === map.loaded) {
    return true;
  }
  return state;
}

export default combineReducers({
  zoom,
  loaded,
});

const visible = {
  visibility: 'visible',
};

const hidden = {
  visibility: 'none',
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
  'circle-stroke-width': 1,
};

const medium = {
  'circle-radius': 2,
  'circle-stroke-width': 1,
};

const small = {
  'circle-radius': 1,
  'circle-stroke-width': 1,
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
