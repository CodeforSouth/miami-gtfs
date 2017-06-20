import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
// import reducers
import reducers from 'reducers';
import { history } from 'lib/history';

const middleware = process.env.NODE_ENV !== 'production'
  ? [createLogger(), routerMiddleware(history)]
  : [routerMiddleware(history)];

const configureStore = compose(applyMiddleware(...middleware))(createStore);

const store = configureStore(reducers, {});

export default store;
