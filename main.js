require('dotenv').config();

const request = require('request');
const fs = require('fs');
const { Observable } = require('rx');

Observable
  .fromNodeCallback(request, undefined, (r, body) => body)({
    method: 'GET',
    url: 'http://api.tildacdn.info/v1/getpagefullexport/',
    qs: {
      publickey: process.env.PUBLIC_KEY,
      secretkey: process.env.PRIVATE_KEY,
      pageid: process.env.PAGE_ID
    },
    json: true
  })
  .map(body => {
    if (body.status !== 'FOUND') {
      throw new Error(
        'Bad response status. Check your credentials and try again.\n' +
        JSON.stringify(body, null, 2)
      );
    }

    return body.result;
  })
  .flatMap(body => Observable
    .fromNodeCallback(fs.writeFile, fs)(`${process.env.DEST_DIR}/index.html`, body.html)
    .map(body))
  .do(() => console.log(`${process.env.DEST_DIR}/index.html <- @`))
  .flatMap(body => [].concat(
    body.images,
    body.css,
    body.js
  ))
  .do(({ from, to }) => console.log(`${process.env.DEST_DIR}/${to} <- ${from}`))
  .flatMap(({ from, to }) => Observable.create(observer => {
    const saver = request(from);
    saver.on('end', () => observer.onCompleted());
    saver.pipe(fs.createWriteStream(`${process.env.DEST_DIR}/${to}`));
  }))
  .subscribe();
