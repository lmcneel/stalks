const usersModel = require('./user');

module.exports = function(sequelize, Sequelize){
    const Friendship = db.define('friendship', {
        user: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: usersModel,
                key: 'user_id'
            }
        },
        friend: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: usersModel,
                key: 'user_id'
            }
        }
    });
return Friendship;
};