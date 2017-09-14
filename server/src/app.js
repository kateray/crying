// helpful: https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/
// https://medium.com/@patriciolpezjuri/using-create-react-app-with-react-router-express-js-8fa658bf892d
// https://www.akawebdesign.com/2016/11/30/combining-create-react-app-express/

const express = require('express')
  , http    = require('http')
  , path    = require('path')
  , fs = require('fs')
  , bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , cookieSession = require( 'cookie-session')
  , morgan = require('morgan')
  , session = require('express-session')
  , passport = require('passport')
  , LocalStrategy = require( 'passport-local').Strategy
  , bcrypt = require( 'bcryptjs')
  , _ = require( 'lodash')

const manifestPath = `${process.cwd()}/dist/build-manifest.json`;
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))

const routes = require('./routes/index')
  , models = require('./models/index');

const l = require( './lib')

const app = express()

app.use('/static', express.static('dist'))
app.use(express.static('client/public'))
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cookieSession({ secret: 'alien coffee', resave: true, saveUninitialized: true }))
app.use(passport.initialize());
app.use(passport.session());

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

app.set('port', (process.env.PORT || 3001))


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  models.User.findById(id)
    .then( (user) => {
      if (user) {
        done(null, user.get());
      } else {
        // TODO
        done(null, null)
      }
    })
});

function randId() {
  return Math.random().toString(36).substr(2, 10);
}

passport.use(new LocalStrategy({usernameField: 'email'},
  (username, password, done) => {
    models.User.findOne({where: {email: username }}).then( (user) => {
      if (!user) {
        return done(null, false, { message: 'no user.' })
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (err) return done(null, false, { error: {password: err}})
        if (res === false) {
          return done(null, false, { error: {password: 'Incorrect password'} })
        } else {
          return done(null, user)
        }
      })
    })
  }
))

app.use(routes);

app.get('/logout', function(req, res){
  req.logout()
  res.redirect('/')
})

const createHTML = async (req, res) => {
  let pinAttrs = ['heading', 'pitch', 'zoom', 'hex', 'lat', 'lng', 'name', 'title']
  const jsLink = manifest['main.js']
  const cssLink = manifest['main.css']
  fs.readFile(path.join(__dirname+'/../../client/index.html'), 'utf8', async (err, htmlData)=>{
    if (err) {
      console.error('read err', err)
      return res.status(404).end()
    }
    const user = req.isAuthenticated() ? {uid: req.user.uid} : {uid: false}
    let pins
    if (req.params.id) {
      // we are looking at a particular map
      const mapUser = await models.User.findOne({where: {uid: req.params.id}})
      if (user.uid === mapUser.uid) {
        pinAttrs.push('uid')
      }
      pins = await models.Pin.findAll({
        where: {userId: mapUser.id},
        attributes: pinAttrs
      })
    } else {
      // we are looking at home/no map user id
      pins = await models.Pin.findAll({attributes: pinAttrs})
    }
    const RenderedApp = htmlData
      .replace('{{PINS}}', `'${JSON.stringify(pins)}'`)
      .replace('{{USER}}', JSON.stringify(user))
      .replace('{{JS}}', `/static/${jsLink}`)
      .replace('{{CSS}}', `/static/${cssLink}`)
    res.send(RenderedApp)
  })
}

app.get('/maps/:id', createHTML)
app.get('/', createHTML)

const login = async (req, res, next) => {
  let user = await models.User.findOne({where: {email: req.body.email }, attributes: ['id', 'email']})
  if (!user) {
    bcrypt.genSalt(10, async (err, salt) => {
      if (err) return res.status(422).send(err)
      bcrypt.hash(req.body.password, salt, async (err, hash) => {
        if (err) return res.status(422).send('error hashing')
        let errors = l.validateFields(req.body)
        if (!_.isEmpty(errors)) {
          return res.status(422).send({error: {user: errors}})
        }
        user = await models.User.create({password: hash, email: req.body.email, uid: randId()})
        if (!user) {
          return res.status(422).send('no user somehow')
        }
        req.login(user, (err) => {
          if (err) { return res.status(422).send(err) }
          return res.json({status: 'success', message: 'Succesfully created user', data: user.uid});
        })
      })
    })
  } else {
    passport.authenticate('local', (err, user, info) => {
      if (err) { return res.status(422).send({error: {user: info.error}}) }
      if (!user) {
        return res.status(422).send({error: {user: info.error}})
      }
      req.login(user, (err) => {
        if (err) { return res.status(422).send(err) }
        return res.json({status: 'success', message: 'Login successful', data: user.uid});
      })
    })(req, res, next)
  }
}

app.post('/login', login)

module.exports = app
