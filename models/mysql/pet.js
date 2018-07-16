module.exports = function(sequelize, Sequelize) {
    const Pet = sequelize.define('Pet', {
        // The email cannot be null, and must be a proper email before creation
        petType: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        petName: {
            type: Sequelize.STRING,
        },
        health: {
            type: Sequelize.DOUBLE,
        },
        fondness: {
            type: Sequelize.DOUBLE,
        },
        happiness: {
            type: Sequelize.DOUBLE,
        },
        hunger: {
            type: Sequelize.DOUBLE,
        },
        urlImage: {
            type: Sequelize.TEXT,
        },

    });

    Pet.associate = function(models) {
        Pet.hasMany(models.Accessory);
    };

    return Pet;
};
