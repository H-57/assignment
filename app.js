
const express = require('express');
const bodyParser = require("body-parser");
const customerRoutes = require("./routes/customer");
const staticRoutes=require("./routes/staticRoutes")
const homeRoute=require("./routes/home")
const User=require("./models/customer")
const cookieParser=require('cookie-parser')
const ejs=require("ejs")
const path=require('path')





const app = express();
app.use(cookieParser())
// Middlewares

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'views'));
const port = 3000;

// Routes
app.use("/",homeRoute)
app.use("/", customerRoutes);
app.use("/",staticRoutes)

app.get('/*', async(req, res) => {
  ;
res.status(404).render('404')
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
