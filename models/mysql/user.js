const bcrypt = require('bcryptjs');
module.exports = function(sequelize, Sequelize) {
// User Schema
    const User = sequelize.define('User', {
        username: {
            type: Sequelize.STRING,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
        },
        name: {
            type: Sequelize.STRING,
        },
        verified: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        // This is to make sure users only have one update request open at a time
        // Also helps me while in updating both userValidation and this table :D - Michael
        updateRequestOpen: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: sequelize.fn('NOW'),
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: sequelize.fn('NOW'),
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

    // Custom method to check user password
    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };
    return User;
};
