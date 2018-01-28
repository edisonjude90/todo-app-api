var express = require("express");
var routes = express.Router();

routes.get("/todolist", function(req, res){
    
    res.locals.connection.query("SELECT * FROM todo_list where status in (0,1) order by status asc", function(error, result, fields){
        let response = {};
        if (error) {
            response.status = 500;
            response.message = "Error !!!";
            response.error = error;
            response.result = null;
        }else{
            response.status = 200;
            response.message = "Success !!!";
            response.error = null;
            response.result = result;
        }    
        res.end(JSON.stringify(response));
    });

});

routes.post("/addtodolist", function(req,res){

    res.locals.connection.query("INSERT INTO todo_list (todo_content, status) VALUES (?,?)",[req.body.content,0], function(error,result,fields){
        let response = {};
        if (error){
            response.status = 500;
            response.message = "Error !!!";
            response.error = error;
            response.result = null;
        }else{
            response.status = 200;
            response.message = "Success !!!";
            response.error = null;
            response.result = result;
        }
        res.end(JSON.stringify(response));
    });

});

routes.put("/updatetodolist/:id", function(req,res){
    
    res.locals.connection.query("UPDATE todo_list SET todo_content = ? WHERE id = ?",[req.body.content,req.params.id],function(error,result,fields){
        let response = {};
        if (error){
            response.status = 500;
            response.message = "Error !!!";
            response.error = error;
            response.result = null;

        }else{
            response.status = 200;
            response.message = "Success !!!";
            response.error = error;
            response.result = result;
        }
        res.end(JSON.stringify(response));
    });

});

routes.delete("/deletetodolist/:id", function(req,res){
    
    res.locals.connection.query("DELETE FROM todo_list WHERE id = ?",[req.params.id],function(error,result,fields){
        let response = {};
        if (error){
            response.status = 500;
            response.message = "Error !!!";
            response.error = error;
            response.result = null;
        }else{
            response.status = 200;
            response.message = "Success !!!";
            response.error = error;
            response.result = result;
        }
        res.end(JSON.stringify(response));
    });

});

module.exports = routes;