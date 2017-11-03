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

code:
* no more var anywhere
* use Immutable.js (introduces persistent data structures that cannot be mutated. this makes it simpler for compoenets to subscribe to data changes)
* use more React PureComponent (this does only a shallow compare on state/props, and otherwise does not rerender component)
* better division of presentational and container components

features:
* pins still move slightly when you click (like on pee)
* forgot my password / email
