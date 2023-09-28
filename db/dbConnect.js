const { Sequelize } = require('sequelize');
require("dotenv").config();

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialectModule: require('pg'), 
  ssl: true, // Enable SSL
  dialectOptions: {
    ssl: {
      require: true, // Use sslmode=require
    },}
});


module.exports=sequelize