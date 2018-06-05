class Base {
  constructor({ container }) {
    this._container = container;
  }

  get middleware() {
    return (req, res, next) => next();
  }
}

module.exports = Base;
