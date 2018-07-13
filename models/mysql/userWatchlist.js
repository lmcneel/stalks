// needs id, users_id, unique_stock_id, created_at

module.exports = function(sequelize, Sequelize) {
  const UserWatchlist = sequelize.define('UserWatchlist', {
    uniqueStockSymbol: {
      // not sure what data type this will be stored as
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
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
