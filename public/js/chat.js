let socket = io();

function scrollToBottom() {
  let messages = jQuery('#messages');
  let newMessage = messages.children('li:last-child');
  let clientHeight = messages.prop('clientHeight');
  let scrollTop = messages.prop('scrollTop');
  let scrollHeight = messages.prop('scrollHeight');
  let newMessageHeight = newMessage.innerHeight();
  let lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function () {
  let params = jQuery.deparam(window.location.search);
  socket.emit('join', params, function (err) {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('user could not log in');
    }
  });
});

socket.on('disconnect', function () {
  console.log('client connection lost ...');
});

socket.on('updateUserList', function (users) {
  console.log('users', users);
  let ol = jQuery('<ol></ol>');
  users.forEach(element => {
    ol.append(jQuery('<li></li>').text(element));
  });
  jQuery("#users").html(ol);
});

socket.on('newLocationMessage', function (message) {
  let formatedTime = moment(message.createAt).format('h:mm a');
  const template = jQuery("#location-message-template").html();
  let html = Mustache.render(template, {
    user: message.from,
    time: formatedTime,
    url: message.url
  });
  jQuery('#messages').append(html);
  scrollToBottom();
});



socket.on('newMessage', function (message) {
  let formatedTime = moment(message.createAt).format('h:mm a');
  const template = jQuery("#message-template").html();
  let html = Mustache.render(template, {
    user: message.from,
    time: formatedTime,
    text: message.text
  });
  jQuery('#messages').append(html);
  scrollToBottom();
});

jQuery('#message-form').on('submit', function (e) {
  let messageBox = jQuery('[name=message]');
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'client',
    text: messageBox.val()
  }, function (data) {
    messageBox.val('');
  });
});

let locationBtn = jQuery("#set-location");
locationBtn.on('click', function () {
  if (!navigator.geolocation) {
    return alert('geolocation not supported at browser');
  }

  locationBtn.attr('disabled', 'disabled').text('Sending location');

  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
    locationBtn.removeAttr('disabled').text('Set Location');
  }, function () {
    alert('Unable to fetch location.');
    locationBtn.removeAttr('disabled').text('Set Location');
  });

});