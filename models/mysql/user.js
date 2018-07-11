const bcrypt = require('bcryptjs');
module.exports = function(sequelize, DataTypes) {
// User Schema
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
        },

    });
    // A custom method for our User model. It will compare user pawword wit stored password.
    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };
    return User;
};
