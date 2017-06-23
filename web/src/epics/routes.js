import api from 'lib/api';
import Immutable from 'immutable';
import _ from 'lodash';
import { routes, setRoutes } from 'reducers/routes';
import routesFuse from 'lib/search/routes';

export default action$ =>
  action$.ofType(routes.fetch).mergeMap(() =>
    api('routes').then(res => {
      const stops = Immutable.OrderedMap(
        res.stops.map(stop => [stop.stop_id, stop])
      );
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
      const fuseList = [];
      const routes = all.map(route => {
        fuseList.push(route);
        return [route.route_id, route];
      });
      routesFuse.update(fuseList);
      const payload = {
        routes: Immutable.OrderedMap(routes),
        stops,
      };
      return setRoutes(payload);
    })
  );
