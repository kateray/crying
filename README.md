client development
$ npm start

to test production code
cd /client
npm run build

from root
node server

for production:
* AppActions - switch to relative routes
* change facebook success redirect in server.js and https://developers.facebook.com/apps/1911737592393826/fb-login/
* don't really need the cors stuff in routes/index.js


deploying:
https://github.com/mars/heroku-cra-node
http://docs.sequelizejs.com/en/1.7.0/articles/heroku/
https://github.com/sequelize/sequelize/issues/4142
