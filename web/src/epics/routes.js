import { Observable } from 'rxjs/Observable';
import { combineEpics } from 'redux-observable';
import api from 'lib/api';
import _ from 'lodash';
import * as Routes from 'reducers/routes';
import routesFuse from 'lib/search/routes';

const allRoutes = (action$, store) =>
  action$
    .ofType(Routes.types.fetch)
    .filter(action => !action.payload)
    .switchMap(() =>
      Observable.defer(async () => {
        try {
          const res = await api('routes');

          const payload = {
            routes: [],
            list: []
          };

          const types = _(res.routes)
            .groupBy('route_type')
            .value();

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
                route_type: 4
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
          all.forEach(route => {
            fuseList.push(route);
            payload.list.push(route.route_id);
            payload.routes.push([route.route_id, route]);
          });

          routesFuse.update(fuseList);
          return Routes.actions.set(payload);
        } catch (error) {
          console.log(error);
          return null;
        }
      })
    )
    .filter(action => action);

export default combineEpics(allRoutes);
