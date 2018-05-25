const express = require('express');
const Service = require('./src/Helper/Service');

const app = express();
const service = new Service({});
const container = service.load();

app.get('/', (req, res) => {
  res.send('Hello World!')
});

const PORT = container.get('config').app.port;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
