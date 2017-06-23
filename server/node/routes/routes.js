import gtfs from 'gtfs';

export default async function routes(req, res) {
  const [routes, stops] = await Promise.all([
    gtfs.getRoutesByAgency('miami'),
    gtfs.getStops('miami'),
  ]);
  res.send({
    success: true,
    routes,
    stops,
  });
}
