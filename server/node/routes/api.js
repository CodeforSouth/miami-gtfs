const router = require('express').Router();

import knexconfig from 'knexfile.js';
const knex = require('knex')(knexconfig);
const gtfsdb = require('gtfsdb')(knex);

/* Enable CORS */
/*router.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});*/

router.get('/api/v1/agency', function(req, res, next) {
  gtfsdb
    .getAllAgencies()
    .then(function(agencies) {
      res.send(agencies);
    })
    .catch(next);
});

//router.get('/agenciesNearby/:lat/:lon', function(req, res, next) {
//  const lat = req.params.lat;
//  const lon = req.params.lon;
//
//  gtfs.getAgenciesByDistance(lat, lon, function(e, data) {
//    if(e) return next(e);
//    res.send(data || {
//      error: 'No agencies within default radius'
//    });
//  });
//});

//router.get('/agenciesNearby/:lat/:lon/:radiusInMiles', function(req, res, next) {
//  const lat = req.params.lat;
//  const lon = req.params.lon;
//  const radius = req.params.radiusInMiles;
//
//  gtfs.getAgenciesByDistance(lat, lon, radius, function(e, data) {
//    if(e) return next(e);
//    res.send(data || {
//      error: 'No agencies within radius of ' + radius + ' miles'
//    });
//  });
//});

router.get('/api/v1/agency/:agency', function(req, res, next) {
  const agencyKey = req.params.agency;
  gtfsdb
    .getAgencies(agencyKey)
    .then(function(agencies) {
      res.send(agencies);
    })
    .catch(next);
});

router.get('/api/v1/agency/:agency/route', function(req, res, next) {
  const agency_key = req.params.agency;
  gtfsdb
    .getRoutes(agency_key)
    .then(function(agencies) {
      res.send(agencies);
    })
    .catch(next);
});

router.get('/api/v1/agency/:agency/route/:routeId', function(req, res, next) {
  const agencyKey = req.params.agency;
  const routeId = req.params.routeId;
  Promise.all([
    gtfsdb.getRoute(agencyKey, routeId),
    gtfsdb.getRouteTrips(agencyKey, routeId),
  ])
    .then(values => {
      res.send(values);
    })
    //gtfsdb.getRoute(req.params.agency, req.params.routeId)
    //.then(function(agencies) {
    //  gtfsdb.getRouteTrips(req.params.agency, req.params.routeId)
    //
    //  res.send(agencies);
    //})
    .catch(next);
});

router.get('/api/v1/agency/:agency/trip', function(req, res, next) {
  gtfsdb
    .getTrips(req.params.agency)
    .then(function(agencies) {
      res.send(agencies);
    })
    .catch(next);
});

//router.get('/routesNearby/:lat/:lon/:radiusInMiles', function(req, res, next) {
//  const lat = req.params.lat;
//  const lon = req.params.lon;
//  const radius = req.params.radiusInMiles;
//
//  gtfs.getRoutesByDistance(lat, lon, radius, function(e, data) {
//    if(e) return next(e);
//    res.send(data || {
//      error: 'No routes within radius of ' + radius + ' miles'
//    });
//  });
//});

//router.get('/routesNearby/:lat/:lon', function(req, res, next) {
//  const lat = req.params.lat;
//  const lon = req.params.lon;
//
//  gtfs.getRoutesByDistance(lat, lon, function(e, data) {
//    if(e) return next(e);
//    res.send(data || {
//      error: 'No routes within default radius'
//    });
//  });
//});

router.get('/api/v1/agency/:agency/stop', function(req, res, next) {
  gtfsdb
    .getStops(req.params.agency)
    .then(function(stops) {
      res.send(stops);
    })
    .catch(next);
});

router.get('/api/v1/agency/:agency/stop/:stopId', function(req, res, next) {
  gtfsdb
    .getStop(req.params.agency, req.params.stopId)
    .then(function(stop) {
      res.send(stop);
    })
    .catch(next);
});

//router.get('/agency/:agency/stop/:stopId/timetables', function(req, res, next) {
//});

router.get('/api/v1/agency/:agency/stop/:stopId/timetables', function(
  req,
  res,
  next
) {
  const agencyKey = req.params.agency;
  const stopId = req.params.stopId;

  Promise.all([
    gtfsdb.getStop(agencyKey, stopId),
    gtfsdb.getStopTimes(agencyKey, stopId),
  ])
    .then(values => {
      res.send(values);
    })
    .catch(next);
});

export default router;
