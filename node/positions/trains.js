const parseString = require('xml2js').parseString;

function Train({
  id = '',
  lat = 0,
  lng = 0,
  route = null,
  direction = null,
  pointing = null
}) {
  this.kind = 'train';
  this.id = id;
  this.lat = parseFloat(lat, 10);
  this.lng = parseFloat(lng, 10);
  this.route = route;
  this.direction = direction;
  this.pointing = pointing;

  return this;
}

module.exports = async function getTrains(
  url = 'http://www.miamidade.gov/transit/WebServices/Trains/'
) {
  const text = await fetch(url).then(res => res.text());
  const xml = await new Promise((resolve, reject) => {
    parseString(text, (err, result) => {
      resolve(result.RecordSet.Record);
    });
  });

  return xml.map(record => {
    return new Train({
      id: record.TrainID[0],
      lat: record.Latitude[0],
      lng: record.Longitude[0],
      route: record.LineID[0],
      direction: record.Service[0],
      pointing: record.Direction[0]
    });
  });
};
