const express = require("express");
const bodyParser = require("body-Parser");
const request = require("request");
const https = require("https");

const app = express();

// app.use(express.json());
app.use(express.static("public"));
//this is a express module used to read an external file/folder

app.use(bodyParser.urlencoded({
  extended: true
}));
//app.use means we are telling the module to use bodyParser
// it will give us all the details form the from
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signUp.html");

})

app.post("/", function(req, res) {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email

  // console.log(firstName, lastName, email);

  // lets make a javascript object and inside js object we'll insert the data we want to save in mailchimp
  const data = {
    member: [{
      email_address: email,
      status: "subscribed",
      merged_field: {
        FNAME: firstName,
        LNAME: lastName,
      }
    }]

  }
  const jsonData = JSON.stringify(data);

  const url = "https://us21.api.mailchimp.com/3.0/lists/1c311e4602";
  const options = {
    method: "POST",
    auth: "rajroshan:c0b06d087958856500c780761b0f9184-us21",
  }


  const request = https.request(url, options, function(response) {
    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })


  })
  request.write(jsonData);
  // requested to write these jsonData to maichimp
  request.end;
  // req.red when we finish requesting to mailchimp;


});

app.listen(3000, function() {
  console.log("Server is running on port 3000");
});


// API
// mailchimp.com
// f39525aaa200af00f0ad6fe7d18bc546-us21

//unique list_id : 1c311e4602
//it was hard to find;


// 2nd API KEY
//c0b06d087958856500c780761b0f9184-us21
