const app = require('./app')
const models = require('./models/index')

models.sequelize.sync().then(() => {
  app.listen(app.get('port'), () => {
    console.log(`App listening on port ${app.get('port')}!`)
  })
})
