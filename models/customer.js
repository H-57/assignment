
const {  DataTypes } = require('sequelize');
const sequelize=require("../db/dbConnect")
const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,

    primaryKey: true,
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  user_password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
    user_image: {
      type: DataTypes.STRING(255),
    },
  total_orders: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  created_at:{
    type:DataTypes.DATE,
    defaultValue:DataTypes.NOW
  } ,
  last_logged_in: {
    type: DataTypes.DATE,
    defaultValue:DataTypes.NOW
  },
}, {
  timestamps: true, // Set this to true if you want Sequelize to automatically manage timestamps
  tableName: 'Users', // Set the table name explicitly
});

// Sync the model with the database
sequelize.sync();
module.exports=User
