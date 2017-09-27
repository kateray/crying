client development

`npm run start:dev`

to run an interactive session

`node console.js`

to download prod db:

`heroku pg:backups:capture`

`heroku pg:backups:download`

`pg_restore --verbose --clean --no-acl --no-owner -h localhost -d crying latest.dump`

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


Emojis from: http://emojipedia.org/

TODO:

* pins still move slightly when you click (like on pee)
* be able to change email/password
* forgot my password / email
