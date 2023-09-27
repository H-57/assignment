const { Sequelize } = require('sequelize');


  const sequelize=new Sequelize('test1', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql'
})


module.exports=sequelize