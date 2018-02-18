require('isomorphic-fetch');
const _ = require('lodash');
const polyline = require('@mapbox/polyline');

var parseString = require('xml2js').parseString;

async function getShapeXml(url) {
  const text = await fetch(url).then(res => res.text());
  const xml = await new Promise((resolve, reject) => {
    parseString(text, function(err, result) {
      resolve(result.RecordSet.Record);
    });
  });

  return xml;
}

async function getStopsXml(url) {
  const text = await fetch(url).then(res => res.text());
  const xml = await new Promise((resolve, reject) => {
    parseString(text, function(err, result) {
      resolve(result.StationList.Station);
    });
  });

  return xml;
}

async function getShapes(url, id) {
  const xml = await getShapeXml(url);

  const lines = _(xml)
    .groupBy(point => point[`${id}ID`][0])
    .mapValues(points => {
      const line = _(points)
        .orderBy(point => parseInt(point.OrderNum[0]))
        .map(point => [
          parseFloat(point.Latitude[0], 10),
          parseFloat(point.Longitude[0], 10)
        ])
        .value();
      const encoded = polyline.encode(line);
      return encoded;
    })
    .value();

  return lines;
}

async function getStops(url, type) {
  const xml = await getStopsXml(url);

  return _(xml)
    .map(station => {
      const lat = parseFloat(station.StationLat[0], 10);
      const lng = parseFloat(station.StationLong[0], 10);
      const name = station.Station[0];
      const id = station.StationID[0];
      return {
        type,
        id,
        name,
        lat,
        lng
      };
    })
    .value();
}

module.exports = async () => {
  const moverShape = getShapes(
    'https://www.miamidade.gov/transit/WebServices/MoverMapShape/',
    'Loop'
  );

  const trainShape = getShapes(
    'https://www.miamidade.gov/transit/WebServices/TrainMapShape/',
    'Line'
  );

  const moverStops = getStops(
    'http://www.miamidade.gov/transit/mobile/xml/MoverStations/',
    'mover'
  );

  const trainStops = getStops(
    'http://www.miamidade.gov/transit/mobile/xml/TrainStations/',
    'rail'
  );

  return {
    mover: {
      shapes: await moverShape,
      stops: await moverStops
    },
    train: {
      shapes: await trainShape,
      stops: await trainStops
    }
  };
};
