import api from 'lib/api';
import Immutable from 'immutable';
import _ from 'lodash';
import { routes, setRoutes } from 'reducers/routes';

export default action$ =>
  action$.ofType(routes.fetch).mergeMap(() =>
    api('routes').then(res => {
      const types = _(res.routes).groupBy('route_type').value();
      const vehicles = _(types['3'])
        .groupBy(route => {
          return isNaN(parseInt(route.route_short_name, 10))
            ? 'trolley'
            : 'bus';
        })
        .value();
      const trolleys = _(vehicles.trolley)
        .map(trolley => {
          return {
            ...trolley,
            route_type: 4,
          };
        })
        .value();
      const buses = _(vehicles.bus)
        .sortBy(bus => {
          return parseInt(bus.route_short_name, 10);
        })
        .value();
      const all = _.concat(types['2'], types['0'], trolleys, buses);
      const routes = all.map(route => {
        return [route.route_id, route];
      });
      const payload = Immutable.OrderedMap(routes);
      return setRoutes(payload);
    })
  );
