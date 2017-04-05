// mostly from http://mherman.org/blog/2016/03/13/designing-a-restful-api-with-node-and-postgres/#.WOU16xIrLdQ
// also https://github.com/vitaly-t/pg-promise/wiki/Learn-by-Example

var promise = require('bluebird');

var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/crying';
var db = pgp(connectionString);

function getAllPins(req, res, next) {
  db.any('select * from pins')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL pins'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createPin(req, res, next) {
  console.log(req.body.name)
  db.none('insert into pins(name, title, hex, lat, lng, heading, pitch, zoom) values($1, $2, $3, $4, $5, $6, $7, $8)',
    [req.body.name, req.body.title, req.body.hex, req.body.lat, req.body.lng, req.body.heading, req.body.pitch, req.body.zoom])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one pin'
        });
    })
    .catch(function (err) {
      // TODO handle error
      return next(err);
    });
}

module.exports = {
  getAllPins: getAllPins,
  createPin: createPin
};
