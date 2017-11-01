'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'Pins',
      'title',
      {
        type: Sequelize.TEXT
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'Pins',
      'title',
      {
        type: Sequelize.STRING
      }
    )
  }
}
