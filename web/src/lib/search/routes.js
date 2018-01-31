import Fuse from 'fuse.js';

class RoutesFuse {
  constructor() {
    const options = {
      keys: ['route_long_name', 'route_short_name']
    };
    this._fuse = new Fuse([], options);
  }

  update(list) {
    this._fuse.set(list);
  }

  search(term) {
    return this._fuse.search(term);
  }
}

export default new RoutesFuse();
