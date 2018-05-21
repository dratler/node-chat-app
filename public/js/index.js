let socket = io();
socket.on('connect', function () {
  console.log('new client coneection ...');

 //Send server the mail
  socket.emit('createEmail', {
    to: 'moshe@fake.com',
    subject: 'this is a fake mail',
    text: 'this is a fake content '
  });

  socket.emit('createMessage', {
    from: 'client',
    text:'this is client message'
  });
});

socket.on('disconnect', function () {
  console.log('client connection lost ...');
});

//get server requesut
socket.on('newEmail', function (email) {
  console.log(`newEmail ${JSON.stringify(email,undefined,2)}`);
});

socket.on('newMessage', function (message) {
  console.log(`newMessage ${JSON.stringify(message,undefined,2)}`);
});