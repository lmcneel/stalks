//needs id, users_id, unique_stock_id, created_at

module.exports = function(sequelize, DataTypes) {
  const usersWatchList = sequelize.define
  ('usersWatchList', {
    unique_stock_id: {
      type: DataTypes.Integer,
      allowNull: false
    }});
    
  usersWatchList.associate = function(models) {
    //users_id
    usersWatchList.belongsToMany(models.users,{
      foreignKey: "userId"
    });
  };
  return usersWatchList;
};
