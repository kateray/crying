// helpful: https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/
// https://medium.com/@patriciolpezjuri/using-create-react-app-with-react-router-express-js-8fa658bf892d
// https://www.akawebdesign.com/2016/11/30/combining-create-react-app-express/

var express = require('express')
  , bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , morgan = require('morgan')
  , session = require('express-session')
  , passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

var routes = require('./server/routes/index')
  , models = require('./server/models/index');

const app = express()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({ secret: 'alien avocado', resave: true, saveUninitialized: false }));
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

passport.use(new FacebookStrategy({
    clientID: '1911737592393826',
    clientSecret: 'e06623785b1043222dfe076dce159420',
    callbackURL: "http://localhost:3001/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    models.User
      .findOrCreate({where: {facebookId: profile.id}, defaults: {uid: randId() }})
      .spread(function(user, created){
        done(null, user);
      })
  }
));

app.get('/map', (req, res) => {
  res.render('map');
})

app.use('/pins', routes);

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook',
    { successRedirect: 'http://localhost:3000/',
    failureRedirect: '/login' }
  )
);

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
})
