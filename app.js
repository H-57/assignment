
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




const app = express();
app.use(cookieParser())
// Middlewares

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'views'));
const port = 3000;

// multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
  cb(null, `${getUser(req.cookies.uid).user_id}.png`)
  }
})

const upload = multer({ storage: storage })

// Routes
app.use("/",homeRoute)
app.use("/", customerRoutes);
app.use("/",staticRoutes)
// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/image', upload.single('user_image'),async(req,res)=>{
 
  
  try {
    const userId= await getUser(req.cookies.uid).user_id
   
  const user=await User.findByPk(userId)
   const updateUser=await user.update({user_image:req.file.path},{where:{user_id:userId}});
res.json({status:"success",message:"image upload success",image:req.file.path,updateUser})

  
  } catch (error) {
    res.status(400).json({status:"erroe",message:"image not uploaded"})
  }
})


app.get('/*', async(req, res) => {
  ;
res.status(404).render('404')
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));

module.exports=app