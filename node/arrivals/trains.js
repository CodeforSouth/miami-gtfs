import moment from 'moment';
const parseString = require('xml2js').parseString;

function Arrival({
  id = '',
  lat = 0,
  lng = 0,
  route = null,
  direction = null,
  pointing = null
}) {
  this.kind = 'train';
  this.id = id;
  this.lat = lat;
  this.lng = lng;
  this.route = route;
  this.direction = direction;
  this.pointing = pointing;

  return this;
}

const loop = [1, 2, 3];

module.exports = async function getArrivals(id) {
  const url = `https://www.miamidade.gov/transit/mobile/xml/TrainTracker/?StationID=${id}`;

  const text = await fetch(url).then(res => res.text());

  const xml = await new Promise((resolve, reject) => {
    parseString(text, (err, result) => {
      resolve(result.TrainTracker.Info[0]);
    });
  });

  const schedule = {
    NB: [],
    SB: [],
    updatedAt: moment(),
    kind: 'rail'
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
};
