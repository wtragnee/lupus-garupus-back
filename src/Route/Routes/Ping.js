const Base = require('../Base');

class Ping extends Base {
  get config() {
    return {
      path: '/ping'
    };
  }

  get() {
    return (req, res) =>
      res.status(200).json({
        pong: 'pong'
      });
  }
}

module.exports = Ping;
