const bcrypt = require('bcryptjs');
module.exports = function(sequelize, Sequelize) {
// User Schema
    const User = sequelize.define('User', {
<<<<<<< HEAD
        username: {
=======

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
>>>>>>> profile-issues#4
            type: Sequelize.STRING,
            unique: true,
        },
<<<<<<< HEAD
        password: {
=======
        username: {
>>>>>>> profile-issues#4
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
        },
        name: {
            type: Sequelize.STRING,
        },
<<<<<<< HEAD
        verified: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
=======
        balance: {
            type: Sequelize.INTEGER,
            allowNull: false,
>>>>>>> profile-issues#4
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

    // Custom method to check user password
    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };
    return User;
};
