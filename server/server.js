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

  socket.on('disconnect', () => {
    console.log('connection lost');
  });
 //Server send custom requests
  socket.emit('newEmail', {
    to: 'mosh2e@fake.com',
    subject: 'this is a fake mail 2',
    text: 'this is a fake content 2 '
  });

  socket.emit('newMessage', {
    from: 'server',
    text: 'this is newMessage',
    date: new Date().getUTCDate()
  });
 //Server listen to cutom request from client
  socket.on( 'createEmail', (email) => {
    console.log(`createEmail ${JSON.stringify(email,undefined,2)}`);
  });

  socket.on('createMessage', (message) => {
    console.log(`createMessage ${JSON.stringify(message,undefined,2)}`);
  });

});

server.listen(port, () => {
  console.log(`server is starting on port ${port}`)
});