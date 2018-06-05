const _ = require('lodash');

const BaseMiddleware = require('./Base');

class BodyParser extends BaseMiddleware {
  get middleware() {
    return (req, res, next) => {
      // No need to parse body for some methods
      if ('GET' === req.method || 'OPTIONS' === req.method) {
        return next();
      }
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        if (-1 === _.indexOf(['POST', 'PUT'], req.method)) {
          return next();
        }
        try {
          req.body = JSON.parse(body);
        } catch (e) {
          return res.status(400).json({
            err: `Invalid body: error was ${e.message}`
          });
        }
        return next();
      });
      req.on('err', err => res.status(400).json({ error: err.message }));
      return _.noop();
    };
  }
}

module.exports = BodyParser;
