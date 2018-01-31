import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { routerMiddleware } from 'react-router-redux';
import { history } from 'models/History';
import reducers from 'reducers';
import epics from 'epics';
import { dev } from 'constants.js';
import routeJSON from 'lib/routes.json';
import Immutable from 'immutable';

const data = [];
const list = [];
const stops = [];

routeJSON.forEach(json => {
  const { stops: stopList, ...route } = json;
  const routeStops = [];
  stopList.forEach(stop => {
    routeStops.push(stop.id);
    stops.push([stop.id, stop]);
  });
  data.push([
    route.id,
    {
      ...route,
      stops: routeStops
    }
  ]);
  list.push(route.id);
});

const initialState = {
  routes: {
    data: Immutable.Map(data),
    list: Immutable.List(list),
    stops: Immutable.Map(stops)
  }
};

const epicMiddleware = createEpicMiddleware(epics);

let middleware = [routerMiddleware(history), epicMiddleware];

if (dev) {
  middleware = [createLogger(), ...middleware];
}

const configureStore = compose(applyMiddleware(...middleware))(createStore);

const store = configureStore(reducers, initialState);

export default store;
