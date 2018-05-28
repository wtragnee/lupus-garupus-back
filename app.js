const express = require('express');
const Service = require('./src/Helper/Service');
const RouteLoader = require('./src/Helper/RouteLoader');

const app = express();
const service = new Service({});
const container = service.load();

new RouteLoader({ app, container }).load(container.get('config').routes);

const PORT = container.get('config').app.port;
app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Example app listening on port ${PORT}!`);
});
