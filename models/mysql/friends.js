module.exports = function(sequelize, DataTypes){
    var Friends = sequelize.define("Friends",{
    user_id: {
        type: DataTypes.INTEGER,
        allownull: false,
    },
    friend_id: {
        type: DataTypes.INTEGER,
        allownull: false,
    },
    valuation: {
        type: DataTypes.INTEGER,
        allownull: false,
    }
});
return Friends;
};