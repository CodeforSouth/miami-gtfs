import gtfs from 'gtfs';

export default async function trips(req, res) {
  const routeId = req.body.routeId;
  const directions = await gtfs.getDirectionsByRoute('miami', routeId);
  res.send({
    success: true,
    directions,
  });
}
