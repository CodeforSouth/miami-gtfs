import _ from 'lodash';

import getArrivals from './arrivals';
import getPositions from './positions';

export default async mover => {
  const [arrivals, locations] = await Promise.all([
    getArrivals(mover),
    getPositions()
  ]);

  const positions = _.mapValues(locations, (position, vehicle) => {
    const route = position.route;
    _.each(arrivals, times => {
      times[route].forEach(time => {
        if (time.vehicle === vehicle) {
          position.arrivals.push(time);
        }
      });
    });
    return position;
  });

  return {
    arrivals: _.keyBy(arrivals, 'id'),
    positions
  };
};
