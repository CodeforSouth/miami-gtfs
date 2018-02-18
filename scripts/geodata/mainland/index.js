const _ = require('lodash');

const stopsJSON = require('./stops.json');
const routesJSON = require('./routes.json');

module.exports = () => {
  const stops = _(stopsJSON)
    .groupBy('RouteID')
    .mapValues(group =>
      group.map(stop => {
        return {
          id: stop.ID,
          route: stop.RouteID,
          name: stop.Name,
          lat: parseFloat(stop.Latitude, 10),
          lng: parseFloat(stop.Longitude, 10),
          type: 'trolley'
        };
      })
    )
    .value();

  const routes = routesJSON.map(route => {
    return {
      type: 'trolley',
      id: route.ID,
      name: route.Name,
      poly: route.RoutePath,
      color: route.LineColor,
      stops: stops[route.ID]
    };
  });

  return routes;
};
