module.exports = function(sequelize, Sequelize) {
  const Accessory = sequelize.define('Accessory', {
    name: Sequelize.STRING,
    quantity: Sequelize.DOUBLE,
  });
  Accessory.associate = function(models) {
    Accessory.belongsTo(models.Pet);
  };

  return Accessory;
};
