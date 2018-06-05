const BaseError = require('../../../src/Error/BaseError');
const InMemory = require('./InMemory');

class Store {
  constructor(config) {
    switch (config.type) {
      case 'test':
        return new InMemory();
      default:
        throw new BaseError(`Invalid store type: ${config.type}`);
    }
  }
}

module.exports = Store;
