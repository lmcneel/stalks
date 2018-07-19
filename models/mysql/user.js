const bCrypt = require('bcryptjs');
module.exports = function(sequelize, Sequelize) {
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
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        },
        balance: {
            type: Sequelize.INTEGER,
            allowNull: false,

        },
        mongo_id: {
            type: Sequelize.STRING,
        },
        mongo_portfolio_id: {
            type: Sequelize.STRING,
        },
        last_login: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'active',
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
    // names of other models have not been established so the associations are subject to change
    // User.associate = function(models) {
    //     // at this point we are assuming users only have one pet
    //     User.hasOne(models.Pet, {
    //         onDelete: 'cascade',
    //     }),
    //     // haven't seen title incorporated in the current scope but if necessary
    //     // User.belongsTo(models.titles),
    //     User.hasMany(models.UserWatchlist, {
    //         onDelete: 'cascade',
    //     }),
    //     User.hasMany(models.UserLogins, {
    //         onDelete: 'cascade',
    //     }),
    //     User.hasMany(models.Friends, {
    //         onDelete: 'cascade',
    //     });
    //     // User.hasMany(models.users_accomplishments, {
    //     //     onDelete: 'cascade'
    //     // }),
    //     // User.hasMany(models.users_gifts, {
    //     //     onDelete: 'cascade'
    //     // });
    // };
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
        User.hasMany(models.Friends, {
            onDelete: 'cascade',
        });
        // User.hasMany(models.users_accomplishments, {
        //     onDelete: 'cascade'
        // }),
        User.hasMany(models.UserValidation, {
            onDelete: 'cascade',
        });
    };


    // A custom method for our User model. It will compare user pawword wit stored password.
    User.prototype.validPassword = function(password) {
        return bCrypt.compareSync(password, this.password);
      };
    return User;
};
