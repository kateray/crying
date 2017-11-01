'use strict'
module.exports = function (sequelize, DataTypes) {
  var Pin = sequelize.define('Pin', {
    uid: DataTypes.STRING,
    name: DataTypes.STRING,
    title: DataTypes.STRING,
    hex: DataTypes.STRING,
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL,
    heading: DataTypes.INTEGER,
    pitch: DataTypes.INTEGER,
    zoom: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function (models) {
        Pin.belongsTo(models.User, {
          foreignKey: 'userId',
          onDelete: 'CASCADE'
        })
      }
    }
  })
  return Pin
}
