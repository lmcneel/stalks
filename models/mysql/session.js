module.export = function(sequelize, DataTypes) {
    const Session = sequelize.define('Session', {
        sid: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        userId: Sequelize.STRING,
        expires: Sequelize.DATE,
        data: Sequelize.STRING(50000),
    });

    Session.associate = function(models) {
        Session.hasOne(models.User, {
            onDelete: 'cascade',
        });
    };
    return Session;
};
