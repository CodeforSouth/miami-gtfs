const _ = require('lodash');
const fs = require('fs');

const trolleys = require('./trolleys.json');

const dade = require('./dade');
const gablesData = require('./gables');
const beachData = require('./beach');

async function main() {
  const { mover: movers, train: trains } = await dade();
  const gables = gablesData();
  const beach = beachData();

  let routes = trolleys.map(route => {
    route.type = 'trolley';
    route.stops = route.stops.map(stop => {
      return {
        type: route.type,
        ...stop,
        lat: parseFloat(stop.lat, 10),
        lng: parseFloat(stop.lng, 10)
      };
    });
    return route;
  });

  const train = {
    type: 'rail',
    ids: ['GRN', 'ORG'],
    name: 'Rail',
    poly: trains.shapes,
    colors: {
      ORG: '#f21d41',
      GRN: '#50A66A'
    },
    stops: trains.stops
  };

  const mover = {
    type: 'mover',
    ids: ['OMN', 'BKL', 'INN', 'OTR'],
    names: ['Omni', 'Brickell', 'Inner Loop', 'Outer Loop'],
    poly: movers.shapes,
    colors: {
      OMN: '#24BBED',
      BKL: '#24BBED',
      INN: '#24BBED',
      OTR: '#24BBED'
    },
    stops: movers.stops
  };

  routes = [train, mover, gables, ...beach, ...routes];

  fs.writeFileSync('map.json', JSON.stringify(routes), 'utf8');
}

main();
