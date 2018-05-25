const Config = require('./Config');
const _ = require('lodash');
const Jimple = require('jimple');
const fs = require('fs');

const ReadPath = require('./ReadPath');
const BaseError = require('../Error/BaseError');

const stringArgsRegex = /^%(.+)%$/gi;
const moduleArgsRegex = /^@(.+)@$/gi;

class Service {
  constructor({ path = './config/services' }) {
    this._options = { path };
    this._config = new Config({});
    this._container = new Jimple();
  }

  _initNewService({
    name,
    classPath,
    isClass,
    methodName,
    module,
    submodule,
    args
  }) {
    let Class;
    // Get class, module or submodule depending on the config
    if (classPath) {
      // eslint-disable-next-line
      Class = require(fs.realpathSync(classPath));
    } else if (module) {
      // eslint-disable-next-line
      const module = require(module);
      if (submodule) {
        Class = module[submodule];
      } else {
        Class = module;
      }
    } else {
      throw new BaseError(`No classPath or module has been set for ${name}`);
    }
    // Create instance with chosen arguments
    let service;
    const mappedArgs = this._getArguments(args);
    if (isClass) {
      service = new Class(mappedArgs || {});
    } else if (methodName) {
      service = Class[methodName](mappedArgs || {});
    } else {
      service = Class;
    }
    return service;
  }

  /**
   * Interprete arguments
   * @param args
   * @returns {*}
   * @private
   */
  _getArguments(args) {
    if (_.isObject(args)) {
      return _.mapValues(args, arg => this._getArgument(arg));
    } else if (_.isArray(args)) {
      return _.map(args, arg => this._getArgument(arg));
    }
    if (_.isString(args)) {
      return this._getArgument(args);
    }
    return args;
  }

  /**
   * Interprete single argument
   * @param arg
   * @returns {*}
   * @private
   */
  _getArgument(arg) {
    if (_.isString(arg)) {
      if ('Container' === arg) {
        return this._container;
      } else if (arg.match(stringArgsRegex)) {
        const options = stringArgsRegex.exec(arg);
        return _.get(this._config, _.nth(options, 1));
      } else if (arg.match(moduleArgsRegex)) {
        const options = moduleArgsRegex.exec(arg);
        // eslint-disable-next-line global-require, import/no-dynamic-require
        return require(_.nth(options, 1));
      }
    }
    return arg;
  }

  load() {
    const paths = new ReadPath(this._options).listSync();
    _.forEach(paths, path => {
      // eslint-disable-next-line
      const serviceConfig = require(path);
      if (!_.has(serviceConfig, 'name')) {
        throw new BaseError(`Missing name property for: ${path}`);
      }
      const { name } = serviceConfig;
      if (_.some(this._names, name)) {
        throw new BaseError(`Name already set: ${name}`);
      }
      const service = this._initNewService(serviceConfig);
      this._container.set(name, service);
    });
    return this._container;
  }
}

module.exports = Service;
