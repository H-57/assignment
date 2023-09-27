const express=require('express')
const User=require("../models/customer")
const{restrictToLoggenInUserOnly}=require("../middleware/auth");
const { getUser } = require('../service/auth');
const router=express.Router()

router.get("/",restrictToLoggenInUserOnly, async(req, res) => {
 
   
     let  userData=await User.findAll({})
         
      res.render('home',{title:"user tabel",userData,login:true});

  });
  router.get("/profile",restrictToLoggenInUserOnly,async(req, res) => {
 
   const userId=await getUser(req.cookies.uid).user_id
    let userData=await User.findByPk(userId)
        userData=userData.dataValues
        console.log(userData);
     res.render('profile',{userData,login:true});

 })
  module.exports=router