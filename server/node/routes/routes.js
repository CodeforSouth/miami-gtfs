import gtfsdb from 'lib/gtfsdb';

export default async function routes(req, res) {
  const routes = await gtfsdb.getRoutes('miami');
  res.send({
    success: true,
    routes,
  });
}
