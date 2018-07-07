module.exports = function (sequelize, DataTypes) {
    var Packs = sequelize.define("Packs", {
        clan_name: {
            type: DataTypes.STRING,
            allownull: false,
        },
        admin_id: {
            type: DataTypes.STRING,
            allownull: false,
        },
        average_valuation: {
            type: DataTypes.INTEGER,
            allownull: false,
        }
    });
    return Packs;
};