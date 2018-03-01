import _ from 'lodash';

import getArrivals from './arrivals';
import getPositions from './positions';

export default async rail => {
  const [arrivals, locations] = await Promise.all([
    getArrivals(rail),
    getPositions()
  ]);

  const positions = _.mapValues(locations, (position, vehicle) => {
    const direction = position.direction;
    if (!direction.match(/(NB|SB)/)) {
      position.arrivals = [];
      return;
    }
    _.each(arrivals, times => {
      times[direction].forEach(time => {
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
