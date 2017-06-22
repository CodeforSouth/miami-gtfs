import { combineEpics } from 'redux-observable';
import routes from 'epics/routes';

export default combineEpics(routes);
