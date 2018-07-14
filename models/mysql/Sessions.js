module.exports = function(sequelize, Sequelize) {

    const Sessions = sequelize.define('Sessions', {
        sid: {
            type: Sequelize.STRING,
            primaryKey: true,
          },
        userId: Sequelize.STRING,
        expires: Sequelize.DATE,
        data: Sequelize.STRING(50000),
    });

    return Sessions;
};
