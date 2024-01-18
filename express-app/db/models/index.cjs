const User = require('./user.cjs');
const RefreshToken = require('./refreshtoken.cjs');
const Sequelize = require('sequelize');

//Generate Sequelize Singleton
const sequelizeSingleton = new Sequelize(process.env.SEQUELIZE_URI, {
        dialect: process.env.SEQUELIZE_DIALECT 
      });

// Instantiate models
const user = User(sequelizeSingleton, Sequelize.DataTypes);
const refreshToken = RefreshToken(sequelizeSingleton, Sequelize.DataTypes);

// Run associations
user.associate({refreshToken});
refreshToken.associate({user})


module.exports = {
   user,
   refreshToken,
   sequelizeSingleton
};

