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
        valuation: {
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

// const usersModel = require('./user');

// module.exports = function(sequelize, Sequelize){
//     const Friendship = db.define('friendship', {
//         user: {
//             type: Sequelize.INTEGER,
//             allowNull: false,
//             references: {
//                 model: usersModel,
//                 key: 'user_id'
//             }
//         },
//         friend: {
//             type: Sequelize.INTEGER,
//             allowNull: false,
//             references: {
//                 model: usersModel,
//                 key: 'user_id'
//             }
//         }
//     });
// return Friendship;
};
