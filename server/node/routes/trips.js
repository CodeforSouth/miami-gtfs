import gtfs from 'gtfs';
import _ from 'lodash';

export default async function trips(req, res) {
  const routeId = req.body.routeId;
  const all = await gtfs.getDirectionsByRoute('miami', routeId);
  const routes = _(all)
    .groupBy('route_id')
    .mapValues(group => {
      return _(group)
        .map(trip => trip.direction_id)
        .uniq()
        .value();
    })
    .value();
  const stops = await Promise.all(
    _(routes)
      .map((directions, route) => {
        return Promise.all(
          directions.map(direction => {
            return gtfs.getStopsByRoute('miami', route, direction);
          })
        );
      })
      .value()
  );
  res.send({
    success: true,
    stops
  });
}
