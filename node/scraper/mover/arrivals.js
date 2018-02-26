import moment from 'moment';

export default async function getStopArrivals(mover) {
  const stopArrivalPromises = mover.stops.map(stop => getStopArrival(stop.id));

  const stopArrivals = await Promise.all(stopArrivalPromises);

  return stopArrivals;
}

async function getStopArrival(id) {
  const url = `http://www.miamidade.gov/transit/WebServices/MoverTracker/?StationID=${id}`;

  const text = await fetch(url).then(res => res.text());

  const xml = await new Promise(resolve => {
    require('xml2js').parseString(text, (err, result) => {
      resolve(result.RecordSet.Record[0]);
    });
  });

  const schedule = {
    id,
    OMN: [],
    BKL: [],
    INN: [],
    OTR: []
  };

  const loops = ['first', 'second', 'third', 'forth'];

  loops.forEach(loop => {
    [1, 2].forEach(stop => {
      const loopId = xml[`${loop}LoopID`][0];
      const vehicle = xml[`${loop}Time${stop}_Train`][0];
      const route = xml[`${loop}Direction`][0];

      const seconds = xml[`${loop}Time${stop}_Est`][0];

      const timestamp = moment()
        .add({ seconds })
        .valueOf();

      if (loopId) {
        schedule[loopId].push({
          timestamp,
          kind: 'mover',
          vehicle,
          route,
          station: id
        });
      }
    });
  });

  return schedule;
}
