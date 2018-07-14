module.exports = function(sequelize, Sequelize) {
    const Session = sequelize.define('Session', {
        sid: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        userId: Sequelize.STRING,
        expires: Sequelize.DATE,
        data: Sequelize.TEXT,
    });

    Session.associate = function(models) {
        Session.hasOne(models.User, {
            onDelete: 'cascade',
        });
    };
    return Session;
};