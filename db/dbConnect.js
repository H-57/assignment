const { error } = require("console")
const mysql=require("mysql2")
const mysqlConfigure=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1234",
    database:"customerDb"
})
 const mysqlConnection=mysqlConfigure.connect((error)=>{
    if(!error){
        console.log("connected to db successfully")
    }
    else{
        console.log("error in connection"+error)
    }
})

module.exports={mysqlConnection}