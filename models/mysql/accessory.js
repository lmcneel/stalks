module.exports = function(sequelize, DataTypes) {
    var Accessory = sequelize.define("Accessory", {
      name: DataTypes.STRING,
      quantity: DataTypes.DOUBLE
    });
    Accessory.associate = function(models) {
      models.Accessory.belongsTo(models.Pet);
    };
    
    return Accessory;
  };