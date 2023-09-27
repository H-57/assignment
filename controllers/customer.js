
const User = require("../models/customer")
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const{ setUser,getUser }=require('../service/auth');
const { DATE } = require("sequelize");

const createUser = async (req, res) => {

    try {
        const { user_name, user_email, user_password, total_orders } = req.body

        const user = await User.create({ user_name, user_email, user_password, total_orders })
        const token= setUser(user)//generate jwt token
        await res.cookie("uid",token)
        res.status(200).json({ data: user, message: "User created Success", status: "success" })
    } catch (error) {
        res.status(400).json({ status: "error", message: error.errors[0].message, error, })
    }

};


const updateUser = async (req, res) => {
    console.log(req.cookies.uid)
    try {
        const userId=await getUser(req.cookies.uid).user_id
        // console.log(req.cookies.uid)
        const user = await User.findByPk(userId)
     
          // Update all fields of the user with the data from req.body
        const updateUser=await user.update(req.body,{where:{user_id:userId}});
        const token= setUser(user)//generate jwt token
        await res.cookie("uid",token)
        res.status(200).json({ data: updateUser, message: "User updated Success", status: "success" })
    } catch (error) {
        res.status(400).json({ status: "error", message: "error in update", error, })
    }

};

const deleteUser = async (req, res) => {
    const userID = req.params.id
    try {
      const result=  await User.destroy({where:{user_id:userID}})
      if(!result)throw error
      console.log(result,userID)
        res.status(200).json({  message: "User delete Success", status: "success" })
    } catch (error) {
        res.status(400).json({ status: "error", message: "invalid user", error, })
    }

}
const getDetails = async (req, res) => {
    const userID = req.params.id

    try {
     const result = await User.findByPk(userID)
        if (!result) throw error
        res.status(200).json({ data: result, message: "user data is present", status: "success" })
    } catch (error) {
        res.status(400).json({ status: "error", message: "invalid user", error, })
    }

};

const getImage = async (req, res) => {
    try {
        const userId=req.params.id
const {user_image}=await User.findByPk(userId)
res.json({user_image,})
    } catch (error) {
        res.status(400).json({ status: "error", message: "error in image get", error, })
    }
}


// handle login and analysis
const handelUserLogin=async (req,res)=>{
    const{user_email,user_password}= req.body


    if(!user_email||!user_password){

      return  res.json({message:"plz fill  fields",status:"error"})

    }
    

    try {
        const user=await User.findOne({ where: { user_email, } })
      

        if(!user){
            return res.status(404).json({message:"plz enter right email info",status:"error"})
            }

          
        if(user.user_password!=user_password){
          return  res.status(404).json({message:"plz enter right password info",status:"error"})
            }
       
           
           const token= setUser(user)
           await user.update( { last_logged_in: new Date() },
           { where: {} })
            await res.cookie("uid",token)
           
            res.json({message:"login sucess",status:"ok "})
            
           
           
    } 
    catch (error) {
        res.send(error.message)
    }
      

}
const logOut=async(req,res)=>{
res.clearCookie("uid");
res.redirect('/login')

}














module.exports = { getDetails, getImage, createUser, updateUser, deleteUser,handelUserLogin,logOut }