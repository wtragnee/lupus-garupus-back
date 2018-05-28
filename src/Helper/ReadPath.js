const fs = require('fs');
const _ = require('lodash');

const BaseError = require('../Error/BaseError');

class ReadPath {
  constructor({ path }) {
    if (!path) {
      throw new BaseError('No given path to read');
    }
    this._path = fs.realpathSync(path);
  }

  _listSyncRecursive(path) {
    if (!fs.lstatSync(path).isDirectory()) {
      return [path];
    }
    const recursive = name => this._listSyncRecursive(`${path}/${name}`);
    return _.flatMap(fs.readdirSync(path), recursive);
  }

  listSync() {
    if (!fs.existsSync(this._path)) {
      throw new BaseError(`File not found: ${this._path}`);
    }
    try {
      return this._listSyncRecursive(this._path);
    } catch (e) {
      throw new BaseError(e.message);
    }
  }
}

module.exports = ReadPath;
