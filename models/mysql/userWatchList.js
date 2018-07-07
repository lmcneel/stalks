//needs id, users_id, unique_stock_id, created_at

module.exports = function (sequelize, Sequelize) {
  const User_Watchlist = sequelize.define('User_Watchlist', {
    unique_stock_id: {
      //not sure what data type this will be stored as
      type: Sequelize.INTEGER,
      allowNull: false
    }
  });
 
  User_Watchlist.associate = function (models) {
    //users_id
    User_Watchlist.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return User_Watchlist;
};