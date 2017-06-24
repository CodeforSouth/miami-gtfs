import { combineReducers } from 'redux';
import { createSelector } from 'reselect';

const prefix = 'map/';
export const map = {
  zoom: `${prefix}zoom`,
};

export function setZoom(payload) {
  return {
    type: map.zoom,
    payload,
  };
}

function zoom(state = [11], action = {}) {
  if (action.type === map.zoom) {
    return action.payload;
  }
  return state;
}

export default combineReducers({
  zoom,
});

export const symbolLayout = createSelector(
  state => state.map.zoom,
  zoom => {
    if (zoom > 15.5) {
      return {
        'text-field': '{stop_name}',
        'text-size': 10,
        'text-offset': [1, 0],
        'text-anchor': 'left',
        'text-justify': 'left',
      };
    }
    return {
      visibility: 'none',
    };
  }
);

export const circlePaint = createSelector(
  state => state.map.zoom,
  zoom => {
    if (zoom > 14) {
      return {
        'circle-color': '#157AFC',
        'circle-radius': 5,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#fff',
      };
    } else if (zoom > 12) {
      return {
        'circle-color': '#157AFC',
        'circle-radius': 2,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#fff',
      };
    }
    return {
      'circle-color': '#157AFC',
      'circle-radius': 1,
      'circle-stroke-width': 1,
      'circle-stroke-color': '#fff',
    };
  }
);
