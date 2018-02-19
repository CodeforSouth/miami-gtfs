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

const times = [1, 2, 3];

module.exports = async function getArrivals(id) {
  const url = `https://www.miamidade.gov/transit/mobile/xml/TrainTracker/?StationID=${id}`;

  const text = await fetch(url).then(res => res.text());

  const xml = await new Promise((resolve, reject) => {
    parseString(text, (err, result) => {
      resolve(result.TrainTracker.Info[0]);
    });
  });

  const schedule = {
    Northbound: [],
    Southbound: [],
    updatedAt: moment(),
    kind: 'train'
  };

  times.forEach(i => {
    let time = xml[`NB_Time${i}`][0];
    if (time.indexOf('*') > -1) {
      return;
    } else {
      time = time.split(' ')[0];
    }
    if (time) {
      schedule.Northbound.push({
        time,
        arrival: xml[`NB_Time${i}_Arrival`][0],
        color: xml[`NB_Time${i}_LineID`][0]
      });
    }
  });
  times.forEach(i => {
    let time = xml[`SB_Time${i}`][0];
    if (time.indexOf('*') > -1) {
      return;
    } else {
      time = time.split(' ')[0];
    }
    if (time) {
      schedule.Southbound.push({
        time,
        arrival: xml[`SB_Time${i}_Arrival`][0],
        color: xml[`SB_Time${i}_LineID`][0]
      });
    }
  });
  return schedule;
};
