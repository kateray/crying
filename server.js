// helpful: https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/
// https://medium.com/@patriciolpezjuri/using-create-react-app-with-react-router-express-js-8fa658bf892d
// https://www.akawebdesign.com/2016/11/30/combining-create-react-app-express/

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const router = express.Router()

const app = express()
app.use(bodyParser.json({ type: 'application/json' }))
const db = require('./queries')

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

app.set('port', (process.env.PORT || 3001))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

router.get('/', db.getAllPins)
router.post('/save', db.savePins)

app.use('/pins', router);

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
})
