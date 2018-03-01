// const shape = {
//   arrivals: {
//     key: {
//       key: String,
//       timestamp: Number,
//       kind: String,
//       vehicle: String,
//       route: String,
//       station: String
//     }
//   },
//   positions: {
//     key: {
//       key,
//       id,
//       lat,
//       lng,
//       route,
//       direction,
//       bearing,
//       arrivals
//     }
//   }
// }

import * as admin from 'firebase-admin';

import _rail from './rail';
import _mover from './mover';

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://miami-gtfs.firebaseio.com'
});

const db = admin.database();
const positions = db.ref('/positions');
const arrivals = db.ref('/arrivals');

class Scraper {
  state = {
    rail: null,
    mover: null
  };

  constructor() {
    const json = require('./map.json');
    this.rail = json.find(route => route.type === 'rail');
    this.mover = json.find(route => route.type === 'mover');

    this._refresh();
  }

  _refresh = async () => {
    try {
      const [rail, mover] = await Promise.all([
        _rail(this.rail),
        _mover(this.mover)
        // this._trolleys()
      ]);

      positions.set({
        rail: rail.positions,
        mover: mover.positions
      });

      arrivals.set({
        rail: rail.arrivals,
        mover: mover.arrivals
      });

      this.state = {
        rail,
        mover
      };
    } catch (error) {
      console.log(error);
    }

    setTimeout(this._refresh, 5000);
  };

  _trolleys = async () => {
    // const [arrivals, positions] = await Promise.all([
    //   getTrolleyArrivals(this.rail),
    //   getTrolleyPositions(this.rail)
    // ])
  };
}

export default new Scraper();
