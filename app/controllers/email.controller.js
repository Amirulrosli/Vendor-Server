
const db = require("../models");
const EmailModel = require("../models/email.model");
const Email = db.email;
const Op = db.Sequelize.Op;
var nodemailer = require('nodemailer')

exports.sendMailing = (req,res)=> {

    const email = req.body.email;
    const body = req.body.body;
    const IC_Number = req.body.IC_Number;
    const subject = req.body.subject;
    const Date = req.body.Date;
    const rid = req.body.rid;
    const slot_Number = req.body.slot_Number;

    var data = {
        rid,
        email,
        subject,
        body,
        IC_Number,
        Date,
        slot_Number
    }




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
        subject: "["+IC_Number+"]"+' '+subject,
        html:
        body+'<br> <br>'+'Slot Number: '+slot_Number+'<br><br>'+Date
      }


      transporter.sendMail(mailOptions, function(error,info){
        if (error){
          console.log(error)

          

        } else {
            console.log("Success: "+ info.response)

            Email.create(data).then(data=> {
              res.send(data)
          }, error=> {
              res.status(500).send({
                  message: error.message
              })
          })
        }

    })

};