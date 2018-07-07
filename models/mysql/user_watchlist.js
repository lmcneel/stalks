// needs id, users_id, unique_stock_id, created_at

module.exports = function(sequelize, Sequelize) {
  const UserWatchlist = sequelize.define('UserWatchlist', {
    unique_stock_id: {
      // not sure what data type this will be stored as
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  UserWatchlist.associate = function(models) {
    // users_id
    UserWatchlist.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return UserWatchlist;
};
