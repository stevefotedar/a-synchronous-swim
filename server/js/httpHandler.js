const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const keypressHandler = require('./keypressHandler');
const queue = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

module.exports.router = (req, res, next = () => { }) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  if (req.method === 'GET') {
    let body = '';
    let message = '';
    req.on('error', err => {
      console.error(err);
    }).on('data', () => {
    }).on('end', () => {
      message = queue.dequeue();
      res.writeHead(200, headers);
      console.log(message);
      res.end(message);
    })
  }
  // if (req.method === 'GET') {
  //   let idx = Math.random() * 3;
  //   let arr = ['left', 'right', 'up', 'down'];
  //   res.writeHead(200, { 'Content-Text': 'text/plain' });
  //   res.end(arr[idx]);
  // }
};
