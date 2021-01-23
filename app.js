// const http = require('http');
// var express = require('express');
// var app = express();

// // Start the server on port 3000
// app.listen(3000, '127.0.0.1');
// console.log('Node server running on port 3000');

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var sql = require('mssql')
var nodemailer = require('nodemailer')



const app = express();

var corsOptions = {
  origin: "http://localhost:4200"
};

var tutorialApi = require("./app/routes/tutorial.routes");

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Server Works like a charm." });
});

// set port, listen for requests



const api = require("./app/routes/tutorial.routes")(app);
const payment = require("./app/routes/payment.routes")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./app/models");
const Op = db.Sequelize.Op;
const Payment = db.payments;

db.sequelize.sync({force: false}).then(()=> {
    console.log("Drop table and resync")

    const date = new Date();

    Payment.findAll().then(data=> {
      var paymentData = data;

    for(let i = 0; i<paymentData.length; i++ ){

      var due_Date = paymentData.dataValue[i].due_Date;

      console.log(due_Date)
      Payment.findAll({where: due_Date <= date}).then(data=> {
        console.log(data)
      }).catch(function(error){
        console.log(error)
      });

    }



    });


});







var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user:'meerros810@gmail.com',
    pass: 'lymuafvzvxrqyfgj'
  }
});

var mailOptions = {
  from: 'meerros810@gmail.com',
  to:'meerros1303@gmail.com',
  subject: 'Sending email using node js',
  text: 'That was easy as  s'
}

transporter.sendMail(mailOptions, function(error,info){
  if (error){
    console.log(error)
  } else {
    console.log('Email sent:'+info.response)
  }
})