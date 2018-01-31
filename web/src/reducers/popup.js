import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { createActions } from 'lib/actions';

const mutations = ['select', 'clear', 'hover', 'leave'];

export const { types, actions } = createActions(mutations, 'map');

function hovered(state = null, { type, payload }) {
  switch (type) {
    case types.hover:
      return payload;
    case types.leave:
      return null;
    default:
      return state;
  }
}

function selected(state = null, { type, payload }) {
  switch (type) {
    case types.select:
      return payload;
    case types.clear:
      return null;
    default:
      return state;
  }
}

export default combineReducers({
  hovered,
  selected
});

export const data = createSelector(
  state => state.popup.hovered,
  state => state.popup.selected,
  state => state.routes.stops,
  state => state.routes.data,
  (hovered, selected, stops, routes) => {
    if (hovered) {
      const stop = stops.get(hovered.id);
      const route = routes.get(stop.route);
      return {
        ...hovered,
        stop,
        route
      };
    }
    if (selected) {
      const stop = stops.get(selected.id);
      const route = routes.get(stop.route);
      return {
        ...selected,
        stop,
        route
      };
    }
    return null;
  }
);
