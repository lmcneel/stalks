module.exports = function(sequelize, Sequelize) {
    let Friends = sequelize.define('Friends', {
        user_id: {
            type: Sequelize.INTEGER,
            allownull: false,
        },
        friend_id: {
            type: Sequelize.INTEGER,
            allownull: false,
        },
        score: {
            type: Sequelize.INTEGER,
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
