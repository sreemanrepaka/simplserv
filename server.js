const express=require("express");
const ejs=require("ejs");
const path=require('path');
const favicon=require('serve-favicon');
const app=express();
const mysql = require('mysql2');

const port=3000;


app.use(express.static(path.join(__dirname , 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.set('view engine', 'ejs');
app.listen(port);

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'srimaan9',
    database: 'simplserv'
  })
  

  connection.connect(function(err) {
    if (!err)
        console.log("Connected!");
    else
        console.log("Connection Failed");
  });

app.get("/index",function(req,res){
    res.sendFile(__dirname + "/index.html");

    
})

app.get("/check",function(req,res){
    username=req.query.username ;
    password=req.query.pass;
    
    connection.query("SELECT * FROM LOGIN",function(err,result){
        if(!err){
            
                var parsedResult = JSON.parse(JSON.stringify(result))
                //res.send(result);
                var dbms_username=parsedResult[0].username;
                var dbms_password=parsedResult[0].pass;

                if (dbms_username==username && dbms_password==password){
                    console.log(result);
                    //console.log(username,pass);
                    res.sendFile(__dirname+"/index.html");
                }
            

                else{
                    res.sendFile(__dirname+"/wrongcreds.html");
                }


        }
        else{
            console.log(err);
        }

    })


})


app.get("/about",function(req,res){
    res.sendFile(__dirname+"/about.html");
})

app.get("/contact",function(req,res){
    res.sendFile(__dirname+"/contact.html");
})



app.get("/services",function(req,res){
    res.sendFile(__dirname+"/services.html");
})

app.get("/login",function(req,res){
    res.sendFile(__dirname+"/login.html");
})

app.get("/",function(req,res){
    res.sendFile(__dirname+"/home.html");

})

app.get("/form_response", function(req,res){
    type="'"+req.query.services+"'";
    area="'"+req.query.area+"'";
    connection.query("SELECT * FROM SERVICES WHERE SERVICE_TYPE="+type+" AND AREA="+area,function(err,result){
        
        if(!err){
            //res.send(result);
            res.render('form_response', {title:'Search Result', action:'list', services:result});


        }
        else{
            console.log(err);
        }

    })


})

// app.get("/form_response", function(req,res){
//     type=req.query.services;
//     connection.query("SELECT * FROM SERVICES WHERE SERVICE_TYPE="+typfunction(err,result){
       
//         try {
//             console.log(result);
//             var parsedResult = JSON.parse(JSON.stringify(result));
//             var id=parsedResult[0].service_id;
//             var service_type=parsedResult[0].service_type;
//             var name=parsedResult[0].service_name;
//             var area=parsedResult[0].area;
//             var address=parsedResult[0].address;
//             var phone_no=parsedResult[0].phone_no;
//             console.log(id);
//             res.render("form_response", {id:id, item_name:item_name, location: location, date: date});
//         }

//         catch (err){
//             //res.render("form_response",{order_details:"Order tracking ID doesnt exist. Type a valid tracking ID"});
//             console.log("error");
            
  
//         }
//       })
// })

