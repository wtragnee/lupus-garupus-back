const BaseMiddleware = require('./Base');

class AllowCrossOrigin extends BaseMiddleware {
  get middleware() {
    return (req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
      );
      return next();
    };
  }
}

module.exports = AllowCrossOrigin;
