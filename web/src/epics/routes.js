import api from 'lib/api';
import Immutable from 'immutable';
import { routes, setRoutes } from 'reducers/routes';

export default action$ =>
  action$.ofType(routes.fetch).mergeMap(() =>
    api('routes').then(res => {
      const routes = res.routes.map(route => {
        return [route.id, route];
      });
      const payload = Immutable.OrderedMap(routes);
      return setRoutes(payload);
    })
  );
