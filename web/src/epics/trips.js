import api from 'lib/api';
import Immutable from 'immutable';
import { trips, setTrips } from 'reducers/trips';

export default action$ =>
  action$
    .ofType(trips.fetch)
    .mergeMap(action =>
      api('trips', { routeId: action.payload }).then(res => {
        console.log(res);
      })
    )
    .filter(() => false);
