const _ = require('lodash');
const ReadPath = require('./ReadPath');

class RouteLoader {
  constructor({ container, app }) {
    this._container = container;
    this._app = app;
  }

  _loadPath(path) {
    const paths = new ReadPath({ path }).listSync();
    _.each(paths, filePath => {
      // eslint-disable-next-line
      const Route = require(filePath);
      const controller = new Route({
        container: this._container
      });
      this._container
        .get('logger')
        .info('Registering %s on path %j', filePath, controller.config.path);
      controller.register(this._app);
    });
  }

  load({ paths }) {
    _.each(paths, path => this._loadPath(path));
  }
}

module.exports = RouteLoader;
