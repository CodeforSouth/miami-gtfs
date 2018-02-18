const stopsStr = require('./stops.js');

const routesStr = require('./routes.js');

module.exports = () => {
  const ids = [];
  const names = [];
  const colors = {};
  const poly = {};

  const stops = JSON.parse(stopsStr).map(stop => {
    return {
      type: 'gables',
      id: '' + stop.id,
      name: stop.name,
      lat: stop.lat,
      lng: stop.lng
    };
  });

  JSON.parse(routesStr).forEach(route => {
    ids.push('' + route.id);
    names.push(route.name);
    poly[route.id] = route.encLine;
    colors[route.id] = route.color;
  });

  return {
    type: 'gables',
    ids,
    names,
    poly,
    colors,
    stops
  };
};
