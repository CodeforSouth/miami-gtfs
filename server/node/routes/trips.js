import gtfsdb from 'lib/gtfsdb';

export default function trips(req, res) {
  const routeId = req.body.routeId;
  gtfsdb.getRouteTrips('miami', routeId).then(res => {
    console.log(res);
    res.send({
      success: true,
      res,
    });
  });
}
