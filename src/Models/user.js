const Sequelize = require('sequelize');

const sequelize = require('../Util/databse');


const User = sequelize.define('register_user',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull : false,
        primaryKey : true 
    },
    firstname:{
        type: Sequelize.STRING,
        allowNull : false
    },
    lastname:{
        type: Sequelize.STRING,
        allowNull: false
    },
    useremail:{
        type: Sequelize.STRING,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull : false
    },
    userpassword: {
        type: Sequelize.STRING,
        allowNull : false
    },
    userdob:{
        type: Sequelize.DATE,
        allowNull: false
    },
    userotp:{
        type: Sequelize.STRING,
        allowNull: false
    },
    useremailverifiedstatus:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    usertimestamp:{
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW
    }
});

module.exports = User;