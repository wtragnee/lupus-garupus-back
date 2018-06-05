const { Logger } = require('winston');
const { Console } = require('winston').transports;
const _ = require('lodash');

class CustomLogger {
  constructor(config) {
    const args = _.assignIn({}, config, {
      transports: [
        new Console({
          timestamp: true
        })
      ]
    });
    return new Logger(args);
  }

  static get testInstance() {
    this.error = () => {};
    this.warn = () => {};
    this.info = () => {};
    this.verbose = () => {};
    this.debug = () => {};
    this.silly = () => {};
    return this;
  }
}

module.exports = CustomLogger;
