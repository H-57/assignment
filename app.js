const mysqlConnection=require("./db/dbConnect")
const express = require('express')
const bodyParser=require("body-parser")
const customerRoutes=require("./routes/customer")
const app = express()

// middelwares
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const port = 3000


// routes
app.use("/",customerRoutes)

app.get('/*', (req, res) => res.send('invalid page'))

app.listen(port, () => console.log(`server listening on port ${port}!`))