var models = require('../models/index');
var express = require('express');
var router  = express.Router();

router.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

 router.all('/save', function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
   res.header("Access-Control-Allow-Credentials", "true");
   res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
   next();
  });

router.get('/', (req, res) => {
  models.Pin
    .findAll({where: {userId: req.user.id}})
    .then(function(pins){
      res.json({status: 'success', message: 'Retrieved all pins', data: pins});
    })
})

// helpful: http://stackoverflow.com/questions/35705622/using-loops-and-promises-in-transactions-in-sequelize
router.post('/save', (req, res) => {
  return models.sequelize.transaction( (t) => {
    var promises = []
    req.body.map((entry) => {
      if (entry.type === 'ADD'){
        var newPromise = models.Pin.create({
          name: entry.data.name,
          title: entry.data.title,
          hex: entry.data.hex,
          lat: entry.data.lat,
          lng: entry.data.lng,
          heading: entry.data.heading,
          pitch: entry.data.pitch,
          zoom: entry.data.zoom,
          uid: entry.data.uid,
          userId: req.user.id
        }, {transaction: t});
        promises.push(newPromise);
      } else if ( entry.type === 'SET' ) {
        var promise = models.Pin.update({
          name: entry.data.name,
          title: entry.data.title,
          hex: entry.data.hex,
          lat: entry.data.lat,
          lng: entry.data.lng,
          heading: entry.data.heading,
          pitch: entry.data.pitch,
          zoom: entry.data.zoom
        }, { where: {uid: entry.data.uid}, transaction: t });
        promises.push(newPromise);
      } else if (entry.type === 'DELETE'){
        var newPromise = models.Pin.destroy({where: {uid: entry.uid}});
        promises.push(newPromise);
      }
    })
    return Promise.all(promises);
  }).then( (result) => {
    models.Pin
      .findAll({where: {userId: req.user.id}})
      .then(function(pins){
        res.json({status: 'success', message: 'Saved pins', data: pins});
      })
  })
})

module.exports = router;
