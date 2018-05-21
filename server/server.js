const config = require('./config/config');
const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('now connection');

  socket.on('createMessage', (message) => {
    console.log(`createMessage ${JSON.stringify(message, undefined, 2)}`);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt:new Date().getTime()
    });
  });

  socket.on('disconnect', () => {
    console.log('connection lost');
  });
});

server.listen(port, () => {
  console.log(`server is starting on port ${port}`)
});