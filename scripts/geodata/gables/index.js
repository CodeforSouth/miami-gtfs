const stopsStr = require('./stops.js');
const stops = JSON.parse(stopsStr);

const routesStr = require('./routes.js');
const routes = JSON.parse(routesStr);

console.log({
  routes,
  stops
});
