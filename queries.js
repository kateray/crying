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

function savePins(req, res, next) {
  const list = req.body
  // TODO ensure the user is allowed
  db.tx(t => {
    const queries = list.map((entry) => {
      if (entry.type === 'ADD'){
        return t.none('insert into pins(uid, name, title, hex, lat, lng, heading, pitch, zoom) values($1, $2, $3, $4, $5, $6, $7, $8, $9)', [entry.data.uid, entry.data.name, entry.data.title, entry.data.hex, entry.data.lat, entry.data.lng, entry.data.heading, entry.data.pitch, entry.data.zoom])
      } else if (entry.type === 'SET'){
        return t.none('update pins set name=$2, title=$3, hex=$4, lat=$5, lng=$6, heading=$7, pitch=$8, zoom=$9 where uid=$1', [entry.data.uid, entry.data.name, entry.data.title, entry.data.hex, entry.data.lat, entry.data.lng, entry.data.heading, entry.data.pitch, entry.data.zoom])
      } else if (entry.type === 'DELETE'){
        return t.none('delete from pins where uid=$1', [entry.uid])
      }
    })
    return t.batch(queries)
  })
  .then( () => {
    db.any('select * from pins')
      .then( data => {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'saved'
          });
      })
  })
  .catch(function (err) {
    // TODO handle error
    return next(err);
  });
}

module.exports = {
  getAllPins: getAllPins,
  savePins: savePins
};
