import gtfs from 'gtfs';

export default async function routes(req, res) {
  const [routes, stops, stopsJSON] = await Promise.all([
    gtfs.getRoutesByAgency('miami'),
    gtfs.getStops('miami'),
    gtfs.getStopsAsGeoJSON('miami'),
  ]);
  res.send({
    success: true,
    routes,
    stops,
    stopsJSON,
  });
}
