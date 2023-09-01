const Sequelize= require('sequelize');
const sequelize=new Sequelize('node-completed','root',null,{
    dialect:'mysql',
    host:'localhost',
    logging: false,
    dialectOptions:{
        password: null
    }
});

module.exports=sequelize;