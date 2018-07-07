module.exports = function (sequelize, DataTypes) {
    var Packs = sequelize.define("Pack", {
        clan_name: {
            type: DataTypes.STRING,
            allownull: false,
        },
        admin_id: {
            type: DataTypes.STRING,
            allownull: false,
        },
        user_id: {
            type: DataTypes.STRING,
            allownull: false,
        },
        pack_id: {
            type: DataTypes.STRING,
            allownull: false,
        },
        valuation: {
            type: DataTypes.INTEGER,
            allownull: false,
        }
    });
    return Pack;
};