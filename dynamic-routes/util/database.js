const Sequelize= require('sequelize');
const sequelize=new Sequelize('node-completed','root','nodecompleted',{
    dialect:'mysql',
    host:'localhost'
});

module.exports=sequelize;