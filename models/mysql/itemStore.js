module.exports = function(sequelize, Sequelize) {
    const ItemStore = sequelize.define('ItemStore', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        category: {
            type: Sequelize.STRING,
            notEmpty: true,
        },
        itemName: {
            type: Sequelize.STRING,
            notEmpty: true,
        },
        imageURL: {
            type: Sequelize.TEXT,
        },
        cost: {
            type: Sequelize.INTEGER,
            notEmpty: true,
        },
        effect: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
    });

    return ItemStore;
};
