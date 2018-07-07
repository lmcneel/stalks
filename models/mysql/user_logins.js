module.exports = function (sequelize, Sequelize) {
    //do we want to define this as user of users
    const User_Logins = sequelize.define('User_Logins', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        }
    });

    User_Logins.associate = function (models) {
        //users_id
        User_Logins.belongsTo(models.user, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return User_Logins;

};