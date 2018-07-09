module.exports = function(sequelize, Sequelize) {
    // do we want to define this as user of users
    const UserLogins = sequelize.define('UserLogins', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
    });

    UserLogins.associate = function(models) {
        // users_id
        UserLogins.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
            },
        });
    };
    return UserLogins;
};
