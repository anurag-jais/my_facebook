const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres','postgres','root@nurag',{ 
    dialect: 'postgres',
    host:'localhost'
});


module.exports = sequelize;