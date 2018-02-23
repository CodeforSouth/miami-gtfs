const parseString = require('xml2js').parseString;

export default async function getStopArrivals(rail) {
  const stopArrivalPromises = rail.stops.map(stop => getStopArrival(stop.id));

  const stopArrivals = await Promise.all(stopArrivalPromises);

  return stopArrivals;
}

async function getStopArrival(id) {
  const loop = [1, 2, 3];

  const url = `https://www.miamidade.gov/transit/mobile/xml/TrainTracker/?StationID=${id}`;

  const text = await fetch(url).then(res => res.text());

  const xml = await new Promise(resolve => {
    parseString(text, (err, result) => {
      resolve(result.TrainTracker.Info[0]);
    });
  });

  const schedule = {
    id,
    NB: [],
    SB: []
  };

  ['NB_Time', 'SB_Time'].forEach((direction, index) => {
    loop.forEach(i => {
      let time = xml[`${direction}${i}`][0];

      if (time.indexOf('*') > -1) {
        return;
      }

      time = time.split(' ')[0];
      if (time) {
        const key = ['NB', 'SB'][index];
        schedule[key].push({
          time,
          arrival: xml[`${direction}${i}_Arrival`][0],
          color: xml[`${direction}${i}_LineID`][0],
          id: xml[`${direction}${i}_Train`][0],
          kind: 'rail'
        });
      }
    });
  });

  return schedule;
}
