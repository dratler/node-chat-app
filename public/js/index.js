let socket = io();
socket.on('connect', function () {
  console.log('new client coneection ...');
});

socket.on('disconnect', function () {
  console.log('client connection lost ...');
});

socket.on('newLocationMessage', function (message) {
  let li = jQuery('<li></li>');
  let a = jQuery('<a target="_blank">my current location</a>');
  li.text(`${message.from}:`);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});



socket.on('newMessage', function (message) {
  let li = jQuery('<li></li>');
  li.text(`${message.from} : ${message.text}`);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'client',
    text: jQuery('[name=message]').val()
  }, function (data) {
    console.log('data send', data);
  });
});

let locationBtn = jQuery("#set-location");
locationBtn.on('click', function () {
  if (!navigator.geolocation) {
    return alert('geolocation not supported at browser');
  }

  navigator.geolocation.getCurrentPosition(function (position) {
    console.log(position);
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    alert('Unable to fetch location.');
  });
});