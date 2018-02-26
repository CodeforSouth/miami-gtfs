import moment from 'moment';

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
    require('xml2js').parseString(text, (err, result) => {
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

      const [minutes, seconds] = time.split(':');

      if (!seconds) return;

      const timestamp = moment()
        .add({ minutes, seconds })
        .valueOf();

      if (timestamp) {
        const key = ['NB', 'SB'][index];
        schedule[key].push({
          timestamp,
          route: xml[`${direction}${i}_LineID`][0],
          vehicle: xml[`${direction}${i}_Train`][0],
          kind: 'rail',
          station: id
        });
      }
    });
  });

  return schedule;
}
