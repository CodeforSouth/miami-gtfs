const parseString = require('xml2js').parseString;

export default async function getRailPositions(
  url = 'http://www.miamidade.gov/transit/mobile/xml/MoverTrains/'
) {
  const text = await fetch(url).then(res => res.text());
  const xml = await new Promise(resolve => {
    parseString(text, (err, result) => {
      resolve(result.MoverTrains.Train);
    });
  });

  return xml.reduce(
    (acc, record) => ({
      ...acc,
      [record.TrainID[0]]: {
        kind: 'mover',
        id: record.TrainID[0],
        lat: parseFloat(record.Latitude[0], 10),
        lng: parseFloat(record.Longitude[0], 10),
        route: record.LoopID[0],
        direction: record.ServiceDirection[0],
        pointing: record.vehDirection[0],
        arrivals: []
      }
    }),
    {}
  );
}
