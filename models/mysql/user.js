// const bcrypt = require('bcryptjs');
module.exports = function(sequelize, DataTypes) {
// User Schema
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
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
        // haven't seen title incorporated in the current scope but if necessary
        // User.belongsTo(models.titles),
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
        // User.hasMany(models.users_gifts, {
        //     onDelete: 'cascade'
        // });
        User.hasOne(models.UserValidation, {
            onDelete: 'cascade',
        });
    };
    return User;
};
