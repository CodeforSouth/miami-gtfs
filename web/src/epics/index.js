import { combineEpics } from 'redux-observable';
import routes from 'epics/routes';
import trips from 'epics/trips';

export default combineEpics(routes, trips);
