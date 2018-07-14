module.exports = function(sequelize, DataTypes) {
// User Schema
    const User = sequelize.define('User', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        firstname: {
            type: Sequelize.STRING,
            notEmpty: true,
        },
        lastname: {
            type: Sequelize.STRING,
            notEmpty: true,
        },
        username: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        balance: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        mongo_id: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        last_login: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING,
        },
    }, {
        underscored: false,
    });

    // names of other models have not been established so the associations are subject to change
    User.associate = function(models) {
        // at this point we are assuming users only have one pet
        User.hasOne(models.Pet, {
            onDelete: 'cascade',
        }),
        User.hasMany(models.UserWatchlist, {
            onDelete: 'cascade',
        });
        User.hasMany(models.UserLogins, {
            onDelete: 'cascade',
        });
        // User.hasMany(models.Friends, {
        //     onDelete: 'cascade',
        // });
        // User.hasMany(models.users_accomplishments, {
        //     onDelete: 'cascade'
        // }),
        User.hasOne(models.UserValidation, {
            onDelete: 'cascade',
        });
    };
    return User;
};
