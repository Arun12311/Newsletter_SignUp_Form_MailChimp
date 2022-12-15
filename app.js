const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

app.get("/",function (req,res) {
  res.sendFile(__dirname + "/signup.html")

})

app.post("/",function (req,res) {
  const firstName = req.body.fName;
  const lastName  =req.body.lName;
  const email = req.body.Email;

  const data ={
  members:[
  {
    email_address : email,
    status : "subscribed",
    merge_fields :
    {
      FNAME : firstName,
      LNAME : lastName,
    }
    }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us8.api.mailchimp.com/3.0/lists/459c75d900";

  const options = {
    method : "POST",
    auth : "arun:b4335265922c7fcde39419a8fac452b3-us8"
  }

  const request = https.request(url,options,function (response) {

    if (response.statusCode === 200) {
      res.sendFile(__dirname+"/success.html")
    }
    else {
      res.sendFile(__dirname+"/failure.html")
    }
      response.on("data",function (data) {
        console.log(JSON.parse(data));
      })
  })

  request.write(jsonData)
  request.end();

})


app.post("/failure", function (req,res) {
  res.redirect("/")
})



app.listen(process.env.PORT || 3000,function (req,res) {
  console.log("Server started at port 3000 ")
})



// API  KEY
// b4335265922c7fcde39419a8fac452b3-us8

// LIST  ID
// 459c75d900
