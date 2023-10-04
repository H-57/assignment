
const express = require('express');
const bodyParser = require("body-parser");
const customerRoutes = require("./routes/customer");
const staticRoutes=require("./routes/staticRoutes")
const homeRoute=require("./routes/home")
const User=require("./models/customer")
const cookieParser=require('cookie-parser')
const ejs=require("ejs")
const path=require('path')
const multer  = require('multer');
const { getUser } = require('./service/auth');
const {putObject}=require('./service/awsBucket/file')
require('dotenv').config()


const app = express();
app.use(cookieParser())
// Middlewares

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'views'));
const port = 3000;



const upload = multer({storage:multer.memoryStorage()})

// Routes
app.use("/",homeRoute)
app.use("/", customerRoutes);
app.use("/",staticRoutes)
// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.post('/image',upload.single('user_image'),async(req,res)=>{
 
  // console.log(req.file);
 
  try {
    const userId= await getUser(req.cookies.uid).user_id
    const file=req.file
    const response=await putObject(file,userId)
    const imageUrl=`${process.env.s3Host}/images/uploads/assignment/${userId}.png`
    // console.log(response);
   
  const user=await User.findByPk(userId)
   const updateUser=await user.update({user_image:imageUrl},{where:{user_id:userId}});
res.json({status:"success",message:"image upload success",image:imageUrl,updateUser})

  
  } catch (error) {
    res.status(400).json({status:"erroe",message:"image not uploaded",error})
  }
})


app.get('/*', async(req, res) => {
  ;
res.status(404).render('404')
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));

module.exports=app