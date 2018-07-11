module.exports = function(sequelize, Sequelize) {
    // do we want to define this as user of users
    const UserValidation = sequelize.define('UserValidation', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        validationCode: {
            type: Sequelize.STRING,
            notEmpty: true,
        },
        validationType: {
            type: Sequelize.STRING,
            notEmpty: true,
        },
        resolved: {
            type: Sequelize.BOOLEAN,
            notEmpty: true,
            defaultValue: false,
        },
        emailVerified: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
    });

    UserValidation.associate = function(models) {
        UserValidation.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
            },
        });
    };
    return UserValidation;
};
