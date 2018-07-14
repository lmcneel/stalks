module.exports = function(sequelize, Sequelize) {
    // do we want to define this as user of users
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
            notEmpty: true,
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
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
        //  this would give us the ability to make accounts inactive is this is decided upon
        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'active',
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
