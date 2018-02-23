import json from './map.json';
import getArrivals from './rail/arrivals';

class Scraper {
  constructor() {
    this.rail = json.find(route => route.type === 'rail');
    this._start();
  }

  _start = async () => {
    const stopArrivals = await getArrivals(this.rail);
    console.log(stopArrivals);
  };
}

export default new Scraper();
