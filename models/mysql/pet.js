module.exports = function(sequelize, Sequelize) {
    const Pet = sequelize.define('Pet', {
      // The email cannot be null, and must be a proper email before creation
      pet_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pet_name: {
          type: Sequelize.STRING,
          allowNull: false,
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

    });

    Pet.associate = function(models) {
      Pet.hasMany(models.Accessory);
    };

    return Pet;
};
