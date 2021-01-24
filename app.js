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
var schedule = require('node-schedule');


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
const Profile = db.tutorials;


db.sequelize.sync({force: false}).then(()=> {
    console.log("Drop table and resync")

    // const date = new Date();
    // const day = date.getDate();
    // const month = date.getMonth();
    // const year = date.getFullYear();

    // arrayPayment = [];

    // Payment.findAll().then(data=> {
    //   var paymentData = data;
    //   console.log(paymentData[1].dataValues.due_Date)

    //   return new Promise (async (resolve)=> {

    //     for(let i = 0; i<paymentData.length; i++ ){

    //       var due_Date = paymentData[i].dataValues.due_Date;
    //       console.log(due_Date.getDate())
    //       var due_DateDay = due_Date.getDate();
    //       var due_DateMonth = due_Date.getMonth();
    //       var due_DateYear = due_Date.getFullYear();

    //         if (due_DateMonth <= month){
    //           if(due_DateYear <= year){
    //             arrayPayment.push(paymentData[i].dataValues)
    //             console.log(arrayPayment)
    //             return true;
    //           }
    //       } 
          

    //       // if (due_Date < date && due_Date== date){
    //       //   arrayPayment.push(paymentData[i].dataValues)
    //       //   console.log(paymentData[i].dataValues)
    //       // } 
    
    //       // console.log(due_Date)
    //       // Payment.findAll({where: due_Date <= date}).then(data=> {
          
    //       // }).catch(function(error){
    //       //   console.log(error)
    //       // });
    
    //     }

    //   })

   



    // });


});

const date = new Date();
const day = date.getDate();
const month = date.getMonth();
const year = date.getFullYear();

console.log(date)

arrayPayment = [];

schedule.scheduleJob({hour: 00, minute: 00}, function(){
  console.log("Server will execute gmail every 12:00")

  Payment.findAll().then(data=> {
    var paymentData = data;
    console.log(paymentData[1].dataValues.due_Date)
  
    return new Promise (async (resolve)=> {
  
      for(let i = 0; i<paymentData.length; i++ ){
  
        var due_Date = paymentData[i].dataValues.due_Date;
        console.log(due_Date.getDate())
        var due_DateDay = due_Date.getDate();
        var due_DateMonth = due_Date.getMonth();
        var due_DateYear = due_Date.getFullYear();
  
        if (due_DateDay <= day){
          if (due_DateMonth <= month){
            if(due_DateYear <= year){
              arrayPayment.push(paymentData[i].dataValues)
              console.log(arrayPayment)
            }
        } else if (due_DateMonth <= month) {
          if(due_DateYear <= year){
            arrayPayment.push(paymentData[i].dataValues)
            console.log(arrayPayment)
          }
        }
  
        }
          
  
      }
        
        return new Promise (async (resolve)=> {
          for(let i = 0; i < arrayPayment.length; i++){
  
            var rid = arrayPayment[i].rid;
            var condition = rid ? { rid: {[Op.like]: `%${rid}`}}: null;
            Profile.findAll({where: condition}).then(data=> {
                var email = data[0].dataValues.email;
                var slot = data[0].dataValues.slot;
                var slot_Price = data[0].dataValues.slot_Price;
    
                console.log(email)
      
                var transporter = nodemailer.createTransport({
                  service: 'gmail',
                  auth: {
                    user: 'meerros810@gmail.com',
                    pass: 'lymuafvzvxrqyfgj'
                  }
                });
                
                var mailOptions = {
                  from: 'meerros810@gmail.com',
                  to: email,
                  subject: '[Payment Overdue] Payment overdue for slot '+slot,
                  html: '<h1>Dear Valued Customer</h1><br><p>Your slot has an overdue of <p>'+slot_Price
                }
                
                transporter.sendMail(mailOptions, function(error,info){
                  if (error){
                    console.log(error)
                  } else {
                    console.log('Email sent:'+info.response)
                  }
                })
      
            }).catch(err=> {
                console.log(err.message)
            })
      
            
          }
    
  
        })
        
       
      
    
    }).catch(err=> {
      console.log(err)
    })
      
    
  
  
  
  
  
  });
})













