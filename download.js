const request = require('request');
const fs = require('fs');
const { Observable } = require('rx');

const download = ({ publickey, secretkey, pageid, dest }) => Observable
  .fromNodeCallback(request, undefined, (r, body) => body)({
    method: 'GET',
    url: 'http://api.tildacdn.info/v1/getpagefullexport/',
    qs: {
      publickey,
      secretkey,
      pageid,
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
    .fromNodeCallback(fs.writeFile, fs)(`${dest}/index.html`, body.html)
    .map(body))
  .do(() => console.log(`${dest}/index.html <- @`))
  .flatMap(body => [].concat(
    body.images,
    body.css,
    body.js
  ))
  .do(({ from, to }) => console.log(`${dest}/${to} <- ${from}`))
  .flatMap(({ from, to }) => Observable.create(observer => {
    const saver = request(from);
    saver.on('end', () => observer.onCompleted());
    saver.pipe(fs.createWriteStream(`${dest}/${to}`));
  }));

module.exports = download;
