const Sequelize = require('sequelize');

const sequelize = require('../Util/databse');


const Post = sequelize.define('user_post',{
    postid:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull : false,
        primaryKey : true 
    },
    id:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Title:{
        type: Sequelize.STRING,
        allowNull : false
    },
    Content:{
        type: Sequelize.STRING,
        allowNull: false
    },
    imageUrl:{
        type: Sequelize.STRING,
        allowNull: true
    },
    creator: {
        type: Sequelize.STRING,
        allowNull : false
    },
    likes:{
        type: Sequelize.INTEGER,
        allowNull : true
    },
    posttimestamp:{
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW
    }
});

module.exports = Post;