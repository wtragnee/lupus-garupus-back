class InMemory {
  constructor() {
    this._map = new Map();
  }

  set(key, value) {
    this._map.set(key, value);
  }

  get(key) {
    return this._map.get(key);
  }
}

module.exports = InMemory;
