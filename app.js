const express = require('express');
const Service = require('./src/Helper/Service');
// const RouteLoader = require('./src/Helper/RouteLoader');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const service = new Service({});
const container = service.load();

// new RouteLoader({ app, container }).load(container.get('config').routes);

const PORT = container.get('config').app.port;
// app.listen(PORT, () => {
//   // eslint-disable-next-line
//   console.log(`Example app listening on port ${PORT}!`);
// });

const server = http.createServer(app);
const io = socketIO(server);
io.on('connection', socket => {
  console.log('New client connected');

  // just like on the client side, we have a socket.on method that takes a callback function
  socket.on('change color', color => {
    console.log('Color Changed to: ', color);
    io.sockets.emit('change color', color);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`))
