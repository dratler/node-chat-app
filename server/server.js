const config = require('./config/config');
const express = require('express');
const path = require('path');

const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT;
let app = express();
app.use();

const BASE_PATH = '/';

app.get(BASE_PATH, (req, res) => {
  res.send({ text: 'hello world'});
});

app.listen(port, () => {
  console.log(`server is starting on port ${port}`)
});

module.exports = {app};