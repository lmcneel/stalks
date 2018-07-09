module.exports = function(sequelize, DataTypes) {
    var Pet = sequelize.define("Pet", {
      // The email cannot be null, and must be a proper email before creation
      pet_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pet_name: {
          type: DataTypes.STRING,
          allowNull: false
      },
      health: {
          type: DataTypes.Double,
      },
      fondness: {
          type: DataTypes.Double,
      },
      happiness: {
          type: DataTypes.Double,
      },
      hunger: {
          type: DataTypes.Double,
      }

    });

    // Pet.associate = function(models) {
    //     models.Pet.belongsTo(models.user);
    // };
    
    Pet.associate = function(models) {
      models.Pet.hasMany(models.Accessories);
    }
};
