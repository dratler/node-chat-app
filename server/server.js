const config = require('./config/config');
const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const {
  generateMessage,
  generateLocationMessage
} = require('./utils/message.js');
const {
  isRealString
} = require('./utils/validation.js');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('now connection');

  socket.emit('newMessage', generateMessage('Admin', 'wellcome to chat room'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'new User joined chat room'));

  socket.on('join', (param, callback) => {
    if (!isRealString(param.name) || !isRealString(param.room)) {
      callback('name and room are required ');
    }
  });

  socket.on('createMessage', (message, callback) => {
    console.log(`createMessage ${JSON.stringify(message, undefined, 2)}`);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('connection lost');
  });
});

server.listen(port, () => {
  console.log(`server is starting on port ${port}`)
});