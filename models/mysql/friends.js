module.exports = function(sequelize, DataTypes) {
    let Friends = sequelize.define('Friends', {
        user_id: {
            type: DataTypes.INTEGER,
            allownull: false,
        },
        friend_id: {
            type: DataTypes.INTEGER,
            allownull: false,
        },
        score: {
            type: DataTypes.INTEGER,
            allownull: false,
        },
    });

    Friends.associate = function(models) {
        Friends.belongsTo(models.User, {
          foreignKey: {
            allowNull: false,
          },
        });
      };

    return Friends;


};
