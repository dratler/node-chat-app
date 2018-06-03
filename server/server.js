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
const {
  Users
} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('now connection');

  socket.on('join', (param, callback) => {
    if (!isRealString(param.name) || !isRealString(param.room)) {
      return callback('name and room are required ');
    }
    socket.join(param.room);
    users.removeUser(socket.id);
    let user = users.addUser(socket.id, param.name, param.room);
    io.to(param.room).emit('updateUserList', users.getUserList(param.room));
    socket.emit('newMessage', generateMessage('Admin', `wellcome to chat room ${param.room}`));
    socket.broadcast.to(param.room).emit('newMessage', generateMessage('Admin', `${param.name} joined chat ${param.room}`));

    callback();
  });

  socket.on('createMessage', (message, callback) => {
    let user = users.getUser(socket.id);
    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    let user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  socket.on('disconnect', () => {
    let user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `user ${user.name} has left`));
    }
  });
});

server.listen(port, () => {
  console.log(`server is starting on port ${port}`)
});