const express = require("express");
const dotenv = require("dotenv")
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require('path')

const connectDB = require('./server/Database/connection');


const app = express();

dotenv.config({path:'config.env'})


const port = process.env.port|| 8080
//log requests
app.use(morgan('tiny'))


//mongo connection
connectDB()
//parsing request to body parser

app.use(bodyParser.urlencoded({extended:true}))


//set view engine

app.set('view engine','ejs');

//loading assets

app.use('/css',express.static(path.resolve(__dirname,"assets/css")));
app.use('/img',express.static(path.resolve(__dirname,"assets/img")));
app.use('/js',express.static(path.resolve(__dirname,"assets/js")));




//Loading router

app.use('/',require('./server/routes/router'))


app.listen(3000,()=>{
  console.log(`Server is running on http://localhost:${port}`);

})