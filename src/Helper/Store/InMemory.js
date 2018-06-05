const _ = require('lodash');
const Promise = require('bluebird');

class InMemory {
  constructor() {
    this._map = new Map();
  }

  set(key, value) {
    return Promise.resolve(this._map.set(key, value));
  }

  get(key) {
    return Promise.resolve(this._map.get(key));
  }

  mget(keys) {
    const map = _.zipObject(keys, _.map(keys, key => this.get(key)));
    return Promise.resolve(map);
  }
}

module.exports = InMemory;
