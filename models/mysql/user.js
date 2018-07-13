const bcrypt = require('bcrypt-nodejs');
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
        // User.hasOne(models.Pet, {
        //     onDelete: 'cascade',
        // }),
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
        // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
        User.prototype.validPassword = function(password) {
            return bcrypt.compareSync(password, this.password);
        };
        // Hooks are automatic methods that run during various phases of the User Model lifecycle
        // In this case, before a User is created, we will automatically hash their password
        User.hook('beforeCreate', function(user) {
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
        });
    };
    return User;
};