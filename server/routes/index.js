var models = require('../models/index');
var express = require('express');
var router  = express.Router();

// need CORS because of development two-server setup
if (process.env.NODE_ENV !== 'production') {
  function cors(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    next();
  }
  router.all('/user', cors)
  router.all('/pins', cors)
  router.all('/pins/:id', cors)
  router.all('/pins/:id/save', cors)
}

router.get('/user', function(req, res){
  var currentUserUid = req.isAuthenticated() ? req.user.uid : false;
  res.json({status: 'success', message: 'Got user', data: currentUserUid})
})

router.get('/pins/:id', (req, res) => {
  models.User.findOne({where: {uid: req.params.id}})
    .then( (user) => {
      models.Pin
        .findAll({where: {userId: user.id}})
        .then(function(pins){
          res.json({status: 'success', message: 'Retrieved all pins', data: pins});
        })
    })
})

router.get('/pins', (req, res) => {
  models.Pin
    .findAll()
    .then(function(pins){
      var data = pins.map(function(pin) {return {
        heading: pin.heading,
        pitch: pin.pitch,
        title: pin.title,
        zoom: pin.zoom,
        hex: pin.hex,
        lat: pin.lat,
        lng: pin.lng,
        name: pin.name
      }});
      res.json({status: 'success', message: 'Retrieved all pins', data: data});
    })
})

function saveData(t, entry, id, promises){
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
      userId: id
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
}

// helpful: http://stackoverflow.com/questions/35705622/using-loops-and-promises-in-transactions-in-sequelize
router.post('/pins/:id/save', (req, res) => {
  var currentUserUid = req.isAuthenticated() ? req.user.uid : false;
  if (req.params.id === currentUserUid) {
    return models.sequelize.transaction( (t) => {
      var promises = []
      req.body.map((entry) => {
        saveData(t, entry, req.user.id, promises)
      })
      return Promise.all(promises);
    }).then( (result) => {
      models.Pin
        .findAll({where: {userId: req.user.id}})
        .then(function(pins){
          res.json({status: 'success', message: 'Saved pins', data: pins});
        })
    })
  } else {
    res.status(403).send('Not authorized')
  }
})

module.exports = router;
