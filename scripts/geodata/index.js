const _ = require('lodash');

const trolleys = require('./trolleys.json');

const dade = require('./dade');
// const gables = require('./gables');

async function main() {
  const { mover: movers, train: trains } = await dade();
  // const gables = gables()

  let routes = trolleys.map(route => {
    route.type = 'trolley';
    route.stops = route.stops.map(stop => {
      return { ...stop, type: route.type };
    });
    return route;
  });

  const train = {
    type: 'rail',
    ids: ['GRN', 'ORG'],
    name: 'RAIL',
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
    names: ['OMNI', 'BRICKELL', 'INNER LOOP', 'OUTER LOOP'],
    poly: movers.shapes,
    colors: {
      OMN: '#24BBED',
      BKL: '#24BBED',
      INN: '#24BBED',
      OTR: '#24BBED'
    },
    stops: movers.stops
  };

  routes = [train, mover, ...routes];

  console.log(routes);
}

main();
