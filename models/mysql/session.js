module.exports = function(sequelize, Sequelize) {
const Session = sequelize.define('Session', {
    sid: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    userId: Sequelize.STRING,
    expires: Sequelize.DATE,
    data: Sequelize.STRING(50000)
  });
  
  Session.associate = function(models) {
    Session.belongsTo(models.User, {
        foreignKey: {
            allowNull: false,
        },
    });
};
return Session;
};
