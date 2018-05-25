const Configture = require('configture');

class Config {
  constructor(options = {}) {
    return new Configture(options).load();
  }
}

module.exports = Config;
