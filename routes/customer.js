const express = require('express')
const router = express.Router()
const{getDetails,getImage,createUser,updateUser,deleteUser}=require("../controllers/customer")

router.get("/details/:id",getDetails)
router.get("/image/:id",getImage)
router.post("/insert",createUser)
router.put("/update",updateUser)
router.delete("/delete:id",deleteUser)
module.exports =router;
