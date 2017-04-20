'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    uid: DataTypes.STRING,
    facebookId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Pin, {
          foreignKey: 'userId',
          as: 'pins'
        });
      }
    }
  });
  return User;
};
