'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 async up (queryInterface, Sequelize) {
 return Promise.all([
   queryInterface.addColumn(
     'Users',
     'password',
     {
       type: Sequelize.CHAR(60),
       allowNull: false
     }
   ),
   queryInterface.addColumn(
     'Users',
     'username',
     {
       type: Sequelize.STRING,
       allowNull: false
     }
   )
 ]);
 },

 async down (queryInterface, Sequelize) {
 return Promise.all([
   queryInterface.removeColumn('Users', 'password'),
   queryInterface.removeColumn('Users', 'username')
 ]);
 }
};
