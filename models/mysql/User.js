<<<<<<< HEAD
module.exports = function(sequelize, DataTypes) {
=======
const bCrypt = require('bcryptjs');
const DB = require('../mongo');
module.exports = function(sequelize, Sequelize) {
>>>>>>> origin/profile-issues#6
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
<<<<<<< HEAD
            type: DataTypes.STRING,
=======
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
>>>>>>> origin/profile-issues#6
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
        },
        last_login: {
            type: Sequelize.DATE,
            allowNull: true,
        },
<<<<<<< HEAD
        name: {
            type: DataTypes.STRING,
=======
        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'active',
>>>>>>> origin/profile-issues#6
        },
        emailVerified: {
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

    User.beforeCreate(function(user) {
       console.log(`Here before user create ${user} \n user wanted password ${user.password}`);
       const hashedPassword = bCrypt.hashSync(user.password, bCrypt.genSaltSync(8), null);
       console.log(`Hashed password is ${hashedPassword}`);
       user.password = hashedPassword;
       console.log(`Users password in database is now ${user.password}`);
    });

    User.afterCreate(function(user) {
        console.log('User has just been created');
        console.log('fasmdal');
        DB.User.create({
            SQLuser_id: user.id,
        })
        .then(function(mongoUser) {
            console.log(`Created user in Mongo ${mongoUser}. Mongo id is ${mongoUser.id}`);
            console.log(`Setting MYSQL user mongo_id to ${mongoUser.id}`);
            User.update({
                mongo_id: mongoUser.id,
            }, {
                where: {
                    id: user.id,
                },
            })
            .then(function(updatedUser) {
                console.log('User is now updated with mongo_id');
                console.log(updatedUser);
            })
            .catch(function(err) {
                console.log(`ERROR: ${err}`);
            });
        })
        .catch(function(err) {
            console.log(`ERROR: ${err}`);
        });
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
<<<<<<< HEAD
=======


    // A custom method for our User model. It will compare user pawword wit stored password.
    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };
>>>>>>> origin/profile-issues#6
    return User;
};
