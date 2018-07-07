module.exports = function (sequelize, Sequelize) {
    //do we want to define this as user of users
    const User_logins = sequelize.define('user_logins', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        login_date: {
            type: Sequelize.DATE,
            notEmpty: true
        },
    });

    User_logins.associate = function (models) {
        //users_id
        User_logins.belongsTo(models.user, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return User_logins;

};