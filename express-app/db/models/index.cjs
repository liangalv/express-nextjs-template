const User = require('./user.cjs');
const RefreshToken = require('./refreshtoken.cjs');
const Sequelize = require('sequelize');
const cls = require('cls-hooked')

//setup cls namespace, enabling transactions
const namespace = cls.createNamespace('transactions');
Sequelize.useCLS(namespace);

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
   sequelize: sequelizeSingleton
};

