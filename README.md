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
