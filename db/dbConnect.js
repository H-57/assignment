const { Sequelize } = require('sequelize');
require("dotenv").config();
const dbName=process.env.DB_Name||process.env.POSTGRES_DATABASE
const user=process.env.User||process.env.POSTGRES_USER
const password=process.env.Password||process.env.POSTGRES_PASSWORD
const host=process.env.HOST||process.env.POSTGRES_HOST
  const sequelize=new Sequelize(dbName, user, password, {
  host: host,
  dialect: 'postgres',
  ssl: true, // Enable SSL
  dialectOptions: {
    ssl: {
      require: true, // Use sslmode=require
    },}
})


module.exports=sequelize