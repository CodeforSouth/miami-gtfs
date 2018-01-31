import Fuse from 'fuse.js';

class Search {
  constructor() {
    this._promise = new Promise(resolve => {
      this._resolve = resolve;
    });
  }

  create(dogs) {
    this._fuse = new Fuse(dogs, {
      shouldSort: true,
      keys: ['name', 'owner', 'gender'],
      include: [
        'name',
        'owner',
        'index',
        'gender',
        'description',
        'geometry',
        'street',
        'city'
      ]
    });
    this._resolve();
  }

  query(str) {
    return this._promise.then(() => {
      return this._fuse.search(str).map(result => result.item);
    });
  }
}

export default new Search();
