const Base = require('../Base');
const uuid = require('uuid/v4');

class GameToken extends Base {
  get config() {
    return {
      path: '/v1/game/token'
    };
  }

  get() {
    return (req, res) => {
      const { token } = req.query;
      return this._container
        .get('store')
        .get(`game:${token}`)
        .then(game => res.status(200).json(game))
        .catch(err =>
          res.status(err.statusCode).json({
            error: err.message
          })
        );
    };
  }

  post() {
    return (req, res) => {
      const { players } = req.body;
      const token = uuid();
      return this._container
        .get('store')
        .set(`game:${token}`, {
          date: new Date().getTime(),
          players
        })
        .then(() => res.status(200).json({ token }))
        .catch(err =>
          res.status(err.statusCode).json({
            error: err.message
          })
        );
    };
  }
}

module.exports = GameToken;
