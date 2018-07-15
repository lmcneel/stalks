module.exports = function(sequelize, Sequelize) {
    const Pet = sequelize.define('Pet', {
        // The email cannot be null, and must be a proper email before creation
        petType: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        petName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        lastPet: {
            type: Sequelize.DATE,
        },
        lastFondness: {
            type: Sequelize.DOUBLE,
        },
        lastFed: {
            type: Sequelize.DATE,
        },
        urlImage: {
            type: Sequelize.TEXT,
        },

    });

    // Pet.associate = function(models) {
    //     models.Pet.belongsTo(models.user);
    // };
    
    Pet.associate = function(models) {
        Pet.hasMany(models.Accessory);
    };

    return Pet;
};
