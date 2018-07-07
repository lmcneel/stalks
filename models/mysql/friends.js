module.exports = function(sequelize, DataTypes){
    var Friends = sequelize.define("Friends",{
    user_id: {
        type.DataTypes.STRING,
        allownull: false,
    },
    friend_id: {
        type.DataTypes.STRING,
        allownull: false,
    },
    valuation: {
        type.DataTypes.INTEGER,
        allownull: false,
    }
    }
)
}