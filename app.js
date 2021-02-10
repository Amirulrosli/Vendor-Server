
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const webpush = require('web-push')
var sql = require('mssql')
var nodemailer = require('nodemailer')
var schedule = require('node-schedule');
const Nexmo = require('nexmo')

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

//external services api


// set port, listen for requests (SET ROUTES)
const api = require("./app/routes/tutorial.routes")(app);
const payment = require("./app/routes/payment.routes")(app);
const notification = require("./app/routes/notification.routes")(app);
const slot = require("./app/routes/slot.routes")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./app/models");
const Op = db.Sequelize.Op;
const Payment = db.payments;
const Profile = db.tutorials;
const Notification = db.notification;


db.sequelize.sync({force: false}).then(()=> {

    console.log("Drop table and resync");

});



// schedule.scheduleJob({hour: 00, minute: 00}, function(){
schedule.scheduleJob('*/1 * * * *',function(){

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth()+1;
  const year = date.getFullYear();
  arrayPayment = [];


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

        if (due_DateYear == year){
          if (due_DateMonth == month){
            if (due_DateDay <= day){
              arrayPayment.push(profileData[i].dataValues);
            }
          } else if (due_DateMonth < month){
            arrayPayment.push(profileData[i].dataValues);
          }
        }else if (due_DateYear < year){
          arrayPayment.push(profileData[i].dataValues);
        }
  
        // if (due_DateDay <= day){ //12 vs 10
        //   if (due_DateMonth <= month){ 
        //     if(due_DateYear <= year){ 
        //       arrayPayment.push(profileData[i].dataValues);
        //     }
        //   } else if (due_DateYear < year) { 
        //         arrayPayment.push(profileData[i].dataValues);
        //   }
        // } else if (due_DateMonth < month){ //3 vs 2
        //     if(due_DateYear <= year){ //2021 vs 2021
        //       arrayPayment.push(profileData[i].dataValues);
        //     } 
        // } else if (due_DateMonth == month) {

        //     if(due_DateYear < year){ //2021 vs 2021
        //       arrayPayment.push(profileData[i].dataValues);
        //     } 
        // } else if(due_DateYear < year){
        //   arrayPayment.push(profileData[i].dataValues);
        // } 
      }

      
        
        return new Promise (async (resolve)=> {

          console.log(arrayPayment)
      
          for(let i = 0; i < arrayPayment.length; i++){

              Payment.findAll({where: {rid: arrayPayment[i].rid, due_Date: arrayPayment[i].latest_Due_Date }}).then(data=> {
                var payment = data;

                var rid = arrayPayment[i].rid;
                console.log(arrayPayment[i].rid)
                var email = arrayPayment[i].email;
                var name = arrayPayment[i].name;
                var slot = arrayPayment[i].slot;
                var slot_Price = arrayPayment[i].slot_Price;
                var latest_Due_Date = arrayPayment[i].latest_Due_Date;
                var phone = arrayPayment[i].phone;
    
                console.log(payment)
  
                if (payment[0].dataValues.send_Email == false){

  
                  const phoneNumber = "673"+phone;
                  const nexmo = new Nexmo({
                    apiKey:'0c8e07ee',
                    apiSecret:'HTK42qTNPOtLyBLH'
                  })
                  
                  const from = 'VMS';
                  const to = phoneNumber;
                  console.log(to)
                  const text = 'Dear valued customer, your slot number: '+slot+' amounting $'+slot_Price+' due on '+latest_Due_Date+ '. Thank You';
              
                  nexmo.message.sendSms(from, to, text);
        
                  var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: 'meerros810@gmail.com',
                      pass: 'lymuafvzvxrqyfgj'
                    }
                  });
  
                  console.log("Email:"+email)
                  
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
      return;
    });
});













