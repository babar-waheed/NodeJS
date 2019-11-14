const Sequelize = require('sequelize');

const sequelize = new Sequelize('databasename', 'username', 'password', {
    dialect: 'mysql', 
    host: 'localhost'
})

module.expoers = sequelize;
