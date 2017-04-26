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
  app.use(express.static('client/build', {maxAge: 86400000}));
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

app.all('/user', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.get('/user', function(req, res){
  var currentUserUid = req.isAuthenticated() ? req.user.uid : false;
  res.json({status: 'success', message: 'Got user', data: currentUserUid})
})

app.use('/pins', routes);

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('http://localhost:3000/');
});

app.get('/auth/facebook', (req, res, next) => {
  passport.authenticate('facebook')(req, res, next)
});
app.get("/auth/facebook/callback", (req, res, next) => {
  passport.authenticate('facebook', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login')}
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('http://localhost:3000/maps/' + user.uid)
    });
  })(req, res, next)
})

// app.get('/map', function(req, res){
//   res.sendfile('client/build/index.html');
// });

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
})
