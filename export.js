require('dotenv').config();

const download = require('./download');

download({
  publickey: process.env.PUBLIC_KEY,
  secretkey: process.env.PRIVATE_KEY,
  pageid: process.env.PAGE_ID,
  dest: process.env.DEST_DIR
}).subscribe();
