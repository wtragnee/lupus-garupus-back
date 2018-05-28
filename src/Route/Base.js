const _ = require('lodash');

class Base {
  static returnUnimplemented() {
    return (req, res) =>
      res.status(404).json({
        error: 'Not implemented'
      });
  }

  register(app) {
    this.app = app;
    if (_.has(this.config, 'path')) {
      this.app.get(this.config.path, this.get());
      this.app.post(this.config.path, this.post());
      this.app.put(this.config.path, this.put());
      this.app.delete(this.config.path, this.delete());
      this.app.head(this.config.path, this.head());
    }
  }

  constructor({ container }) {
    this._container = container;
  }

  get config() {
    return {
      path: '*'
    };
  }

  get() {
    return Base.returnUnimplemented();
  }

  post() {
    return Base.returnUnimplemented();
  }

  put() {
    return Base.returnUnimplemented();
  }

  delete() {
    return Base.returnUnimplemented();
  }

  head() {
    return Base.returnUnimplemented();
  }
}

module.exports = Base;
