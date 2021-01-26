// const http = require('http');
// var express = require('express');
// var app = express();

// // Start the server on port 3000
// app.listen(3000, '127.0.0.1');
// console.log('Node server running on port 3000');

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const webpush = require('web-push')
var sql = require('mssql')
var nodemailer = require('nodemailer')
var schedule = require('node-schedule');


const app = express();

//cors
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

// set port, listen for requests (SET ROUTES)
const api = require("./app/routes/tutorial.routes")(app);
const payment = require("./app/routes/payment.routes")(app);
const notification = require("./app/routes/notification.routes")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./app/models");
const Op = db.Sequelize.Op;
const Payment = db.payments;
const Profile = db.tutorials;
const Notification = db.notification;


db.sequelize.sync({force: true}).then(()=> {
    console.log("Drop table and resync")

});

const date = new Date();
const day = date.getDate();
const month = date.getMonth()+1;
const year = date.getFullYear();

console.log(date)

arrayPayment = [];

// schedule.scheduleJob({hour: 00, minute: 00}, function(){
schedule.scheduleJob('*/5 * * * *',function(){
  console.log("Server will execute gmail every 12:00")

  Profile.findAll().then(data=> {
    var profileData = data;

    
      for(let i = 0; i<profileData.length; i++ ){
  
        var due_Date = profileData[i].dataValues.latest_Due_Date;
        if (due_Date == null){
          return false;
        }
        console.log(due_Date)
        console.log(due_Date.getDate())
        var due_DateDay = due_Date.getDate();
        var due_DateMonth = due_Date.getMonth()+1;
        var due_DateYear = due_Date.getFullYear();
  
        if (due_DateDay <= day){
          if (due_DateMonth <= month){
            if(due_DateYear <= year){
              arrayPayment.push(profileData[i].dataValues);
     
            }
          } else if (due_DateYear <= year) {
              if(due_DateYear <= year){
                arrayPayment.push(profileData[i].dataValues);
        
              }
          }
  
        }else if (due_DateMonth <= month){
          if(due_DateYear <= year){
            arrayPayment.push(profileData[i].dataValues);
          }
        } else if(due_DateYear <= year){
          arrayPayment.push(profileData[i].dataValues);
        }
          
  
      }

      console.log(arrayPayment)
        
        return new Promise (async (resolve)=> {
      
          for(let i = 0; i < arrayPayment.length; i++){
  
            var rid = arrayPayment[i].rid;
            var email = arrayPayment[i].email;
            var name = arrayPayment[i].name;
            var slot = arrayPayment[i].slot;
            var slot_Price = arrayPayment[i].slot_Price;
            var latest_Due_Date = arrayPayment[i].latest_Due_Date;

            Payment.findAll({where: {rid: rid, due_Date: latest_Due_Date}}).then(data=> {
              var payment = data;

              if (payment[0].dataValues.send_Email == false){
      
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

                    
                    const notify = {
                      rid: rid,
                      title: 'User Reminder Notification', 
                      description: 'Automated Email has been sent to '+name+'\n Email: '+email+'\n Account ID: '+rid,
                      category: 'Automated Email Reminder',
                      date: date,
                      view: false
                  };

                  Notification.create(notify).then(data=> {
                    console.log("Notify to client with id:"+data.id)
                  })


                    //Payment Update

                    payment[0].dataValues.send_Email = true;
                    var id = payment[0].dataValues.id;

                    var updatedPayment = {
                      id: payment[0].dataValues.id,
                      rid: payment[0].dataValues.rid,
                      payment_Date: payment[0].dataValues.payment_Date,
                      due_Date: payment[0].dataValues.due_Date,
                      price: payment[0].dataValues.price,
                      email: payment[0].dataValues.email,
                      send_Email: payment[0].dataValues.send_Email,
                    }
                    Payment.update(updatedPayment,{where: {id:id}}).then(result => {
                      console.log(result)
                      if (result == 1){
                        console.log("Successfully updated id:"+id)
                      } else {
                        console.log("Cannot Update id:"+id)
                      }
                    })
                    console.log('Email sent:'+info.response)
                  }
                })

              } 
             
            })
    
               
      
          }
    
  
        })
        
       
      
    
    }).catch(err=> {
      console.log(err)
    });
      
    
  
  
  
 
})













