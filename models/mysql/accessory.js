module.exports = function(sequelize, Sequelize) {
    const Accessory = sequelize.define('Accessory', {
      name: Sequelize.STRING,
      category: Sequelize.STRING,
      imageURL: Sequelize.TEXT,
      quantity: Sequelize.DOUBLE,
      equipped: Sequelize.BOOLEAN,
    });
    Accessory.associate = function(models) {
      Accessory.belongsTo(models.Pet);
    };

    return Accessory;
  };
