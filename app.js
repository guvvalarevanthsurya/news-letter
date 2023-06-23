const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  const fname = req.body.firstname;
  const lname = req.body.lastname;
  const email = req.body.email;
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fname,
          LNAME: lname
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);

  const datacenter="us21";
  const listid="016883a745"
  const url = "https://"+datacenter+".api.mailchimp.com/3.0/lists/"+listid;
  const options = {
    method: "POST",
    auth: "revanth:8082e2cc7d6adbc929b53eafdf0c92ff-us21"
  };

  const apiRequest = https.request(url, options, function(response) {
    if (response.statusCode === 200) {
      console.log("Successfully added the member.");
      res.sendFile(__dirname + "/success.html");
    } else {
      console.log("Failed to add the member.");
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data) {
        //console.log(JSON.parse(data));
    });
  });

  apiRequest.on("error", function(error) {
    console.error("Request error:", error);
    res.sendFile(__dirname + "/failure.html");
  });

  apiRequest.write(jsonData);
  apiRequest.end();
});
app.post("/failure",function(req,res){
    res.redirect("/")
})

app.listen(3000, function() {
  console.log("Server is running on port 3000");
});




// const express=require("express");
// const request=require("request");
// const bodyParser=require("body-parser");
// const https=require("https");


// const app=express();

// app.use(express.static("public"));
// app.use(bodyParser.urlencoded({extended:true}));


// app.get("/",function(req,res){
//     res.sendFile(__dirname+"/signup.html")
// })


// app.post("/",function(req,res){
//     const fname=req.body.firstname;
//     const lname=req.body.lastname;
//     const email=req.body.email;
//     const data={
//         members:[
//             {
//             email_address:email,
//             status:"subscribed",
//             merge_fields:{
//                 FNAME:fname,
//                 LNAME:lname,
//             }

//             }
//         ]
//     };
//     const jsonData=JSON.stringify(data);
//     console.log(jsonData);

//     const url= "https://us21.mailchimp.com/3.0/lists/016883a745/members";
//     const options={
//         method:"POST",
//         auth:"dbeb7cb8dab10dde50d2bdd8db8ecd08-us21"
//     }

//     const apirequest=https.request(url, options, function(response){
//         response.on("data",function(data){
//             console.log(JSON.parse(data));
//         })
//     })
//     apirequest.write(jsonData);
//     apirequest.end();
// })

// app.listen(3000,function(){
//     console.log("server is running on port 3000");
// })

// //api key:8082e2cc7d6adbc929b53eafdf0c92ff-us21

 //016883a745.