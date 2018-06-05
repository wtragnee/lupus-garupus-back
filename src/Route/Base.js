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
      const { middlewares } = this;
      if (_.some(middlewares)) {
        _.each(middlewares, middlewareName => {
          const Middleware = require(`../Middleware/${middlewareName}`); // eslint-disable-line
          const middleware = new Middleware(this._container);
          this.app.route(this.config.path).all(middleware.middleware);
        });
      }

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

  get middlewares() {
    return ['AllowCrossOrigin', 'BodyParser'];
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
