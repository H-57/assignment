const express = require('express')
const router = express.Router()
const{getDetails,getImage,createUser,updateUser,deleteUser,handelUserLogin,logOut}=require("../controllers/customer")
const {restrictToLoggenInUserOnly} =require("../middleware/auth")




router.get("/details/:id",restrictToLoggenInUserOnly,getDetails)

router.get("/image/:id",getImage)
router.post("/insert",createUser)
router.put("/update",restrictToLoggenInUserOnly,updateUser)
router.delete("/delete/:id",restrictToLoggenInUserOnly,deleteUser)
router.post("/login",handelUserLogin)
router.get("/user/logout",logOut)
module.exports =router;
