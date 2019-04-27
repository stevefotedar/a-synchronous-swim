const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const keypressHandler = require('./keypressHandler');
const queue = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', '/background.jpg');
////////////////////////////////////////////////////////

module.exports.router = (req, res, next = () => { }) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  if (req.method === 'GET') {
    if (req.url === '/') {
      let body = '';
      let message = '';
      req.on('error', err => {
        console.error(err);
        return;
      }).on('data', () => {
      }).on('end', () => {
        message = queue.dequeue();
        res.writeHead(200, headers);
        console.log(message);
        res.end(message);
      });
    }
    if (req.url === '/background.jpg') {
      fs.readFile(this.backgroundImageFile, (err, data) => {
        if (err) {
          res.writeHead(404, 'DANGER WILL ROBINSON!');
          res.end();
        } else {
          res.writeHead(200, headers);
          res.write(data);
          res.end();
        }
      });
    }
  }
  // if (req.method === 'POST') {
  //   if (req.url === '/background.jpg') {
  //     fs.writeFile(this.backgroundImageFile, res.data, (err) => {
  //       if (err) {
  //         console.log(err);
  //         return;
  //       }
  //       console.log('File has been saved')
  //     });
  //   }
  // }
};
