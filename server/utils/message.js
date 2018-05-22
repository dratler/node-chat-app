let generateMessage = (from, text) => {
  return {
    from,
    text,
    createAt: new Date().getTime()
  };
};

let generateLocationMessage = (from, latitude,longitude) => {
  return {
    from,
    url:`https://www.google.com/maps/?api=1&query=${latitude},${longitude}`,
    createAt: new Date().getTime()
  };
};

module.exports = { generateMessage, generateLocationMessage };