const createUser=async(req,res)=>{

}
const updateUser=async(req,res)=>{

}
const deleteUser=async(req,res)=>{
const userID=req.params.id

}
const getDetails=async(req,res)=>{
    const userID=req.params.id
    res.send(userID)
}
const getImage=async(req,res)=>{
    const userID=req.params.id
}















module.exports={getDetails,getImage,createUser,updateUser,deleteUser}