import gtfs from 'gtfs';

export default async function routes(req, res) {
  const routes = await gtfs.getRoutesByAgency('miami');
  res.send({
    routes
  });
}
