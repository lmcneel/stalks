module.exports = function(sequelize, Sequelize) {
    // do we want to define this as user of users
    const User = sequelize.define('User', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        // we can combined the to just name if user auth wants this
        firstname: {
            type: Sequelize.STRING,
            notEmpty: true,
        },
        lastname: {
            type: Sequelize.STRING,
            notEmpty: true,
        },
        // fullname: {
        //     type: Sequelize.STRING,
        //     notEmpty: true
        // },
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
        // haven't seen levels incorporated in the current scope but if necessary
        // level: {
        //     type: Sequelize.INTEGER
        // },
        // should be created by association
        // title_id: {
        //     type: Sequelize.INTEGER,
        //     allowNull: false
        // },
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
        underscored: true,
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
        }),
        User.hasMany(models.UserLogins, {
            onDelete: 'cascade',
        });
        // User.hasMany(models.users_friends, {
        //     onDelete: "cascade"
        // }),
        // User.hasMany(models.users_accomplishments, {
        //     onDelete: "cascade"
        // }),
        // User.hasMany(models.users_gifts, {
        //     onDelete: "cascade"
        // });
    };

    return User;
};
