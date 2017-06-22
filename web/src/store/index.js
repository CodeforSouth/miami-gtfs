import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
// import reducers
import reducers from 'reducers';
import { history } from 'lib/history';
// import epics
import epics from 'epics';
const epicMiddlware = createEpicMiddleware(epics);

const middleware = process.env.NODE_ENV !== 'production'
  ? [createLogger(), routerMiddleware(history), epicMiddlware]
  : [routerMiddleware(history), epicMiddlware];

const configureStore = compose(applyMiddleware(...middleware))(createStore);

const store = configureStore(reducers, {});

export default store;
