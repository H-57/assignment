const { Sequelize } = require('sequelize');
require("dotenv").config();
const dbName=process.env.DB_Name
const user=process.env.User
const password=process.env.Password
const host=process.env.HOST
  const sequelize=new Sequelize(dbName, user, password, {
  host: host,
  dialect: 'mysql'
})


module.exports=sequelize