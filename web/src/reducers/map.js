import { combineReducers } from 'redux';
import { createActions } from 'lib/actions';

const mutations = ['loaded'];

export const { types, actions } = createActions(mutations, 'map');

function loaded(state = false, { type, payload }) {
  switch (type) {
    case types.loaded:
      return true;
    default:
      return state;
  }
}

export default combineReducers({
  loaded
});
