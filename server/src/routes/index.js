const models = require('../models/index')
const express = require('express')
const router  = express.Router()
const l = require( '../../../lib')
const _ = require( 'lodash' )

const requiresCorrectUser = ( req, res, next ) => {
  if (!req.isAuthenticated()) {
    return res.status(403).send({error: {app: 'You must be logged in'}})
  }
  if (req.params.user_id !== req.user.uid.toString()) {
    return res.status(403).send({error: {user: {general: 'Not authorized to update this user'}}})
  }
  next()
}

router.put('/user/:user_id', requiresCorrectUser)
router.put('/pins/:id/save', requiresCorrectUser)

router.get('/pins/:id', async (req, res) => {
  let user = await models.User.findOne({where: {uid: req.params.id}})
  let pins = await models.Pin.findAll({where: {userId: user.id}})
  res.json({status: 'success', message: `Retrieved all pins for ${req.params.id}`, data: pins})
})

router.get('/pins', async (req, res) => {
  let pins = await models.Pin.findAll({attributes: ['heading', 'pitch', 'title', 'zoom', 'hex', 'lat', 'lng', 'name']})
  res.json({status: 'success', message: 'Retrieved all pins', data: pins})
})

const saveData = (t, entry, id, promises) => {
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
    }, {transaction: t})
    promises.push(newPromise)
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
    }, { where: {uid: entry.data.uid}, transaction: t })
    promises.push(newPromise)
  } else if (entry.type === 'DELETE'){
    var newPromise = models.Pin.destroy({where: {uid: entry.uid}})
    promises.push(newPromise)
  }
}

router.post('/pins/:user_id/save', (req, res) => {
  return models.sequelize.transaction( (t) => {
    var promises = []
    req.body.map((entry) => {
      saveData(t, entry, req.user.id, promises)
    })
    return Promise.all(promises)
  }).then( (result) => {
    models.Pin
      .findAll({where: {userId: req.user.id}})
      .then((pins) => {
        res.json({status: 'success', message: 'Saved pins', data: pins})
      })
  })
})

//Update user
router.put('/user/:user_id', async (req, res) => {
  let errors = l.validateFields(req.body, 'update')
  if (!_.isEmpty(errors)) {
    return res.status(422).send({error: {user: errors}})
  }
  let user = await models.User.findOne({where: {id: req.user.id }})
  let existingEmail = await models.User.findOne({where: {email: req.body.email, id: {not: user.id} }})
  if (existingEmail){
    return res.status(422).send({error: {user: {email: 'Email is taken'}}})
  }
  if (req.body.password) {
    bcrypt.genSalt(10, async (err, salt) => {
      if (err) return res.status(422).send(err)
      bcrypt.hash(req.body.password, salt, async (err, hash) => {
        if (err) return res.status(422).send('error hashing')
        await user.update({email: req.body.email, password: hash})
        res.json({status: 'success', message: 'Succesfully saved user', data: {uid: user.uid, email: user.email}})
      })
    })
  } else {
    await user.update({email: req.body.email})
    res.json({status: 'success', message: 'Succesfully saved user', data: {uid: user.uid, email: user.email}})
  }
})

module.exports = router
