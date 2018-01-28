const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

const APP_DB_CONFIG = {
    host:"localhost",
    user:"root",
    password:"",
    database:"todo_app_db"
}
const PORT = 8888;
const todoservices = require('./routes/todoservice');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(function(req,res,next){
    res.locals.connection = mysql.createConnection(APP_DB_CONFIG);
    next();
});

app.use("/api/v1/todo/",todoservices);

app.listen(PORT,()=> console.log("Service running on port " + PORT));


