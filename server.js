require('dotenv').config();

const express = require('express');
const download = require('./download');

const app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('Trigger webook manually to get started');
});

app.get(`/${process.env.WEBHOOK_PATH}`, (req, res) => {
  console.log(JSON.stringify(req.query, null, 2));

  res.send('ok'); // required by tilda

  download({
    publickey: process.env.PUBLIC_KEY,
    secretkey: process.env.PRIVATE_KEY,
    pageid: process.env.PAGE_ID,
    dest: process.env.DEST_DIR
  }).subscribe();
});

const port = process.env.EXPRESS_PORT || 8080;
const host = process.env.EXPRESS_HOST || '127.0.0.1';

const listener = app.listen(port, host, () => {
  console.log('Server listening on ' + JSON.stringify(listener.address()));
});
