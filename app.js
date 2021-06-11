
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const webpush = require('web-push')

const dotenv = require('dotenv');
dotenv.config();

var sql = require('mssql')
var nodemailer = require('nodemailer')
var schedule = require('node-schedule');
const Nexmo = require('nexmo')
const app = express();
const multer = require('multer')
const fileExtension = require('file-extension')
const path = require('path');
const session = require('node-sessionstorage')
var fs = require("fs-extra");

//cors -- allow request from: -------------------------------------------------------

var corsOptions = {
  origin: process.env.ORIGIN
};



var tutorialApi = require("./app/routes/tutorial.routes");
var paymentApi = require("./app/routes/payment.routes")

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// // parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/Attachment", express.static(path.join("Attachment")))
app.use("/ProfilePhoto", express.static(path.join("ProfilePhoto")))
app.use("/return", express.static(path.join("returnHtml.html")))
app.use(express.static('vendorManagement'))




const account = require("./app/routes/account.routes")(app);
const api = require("./app/routes/tutorial.routes")(app);
const payment = require("./app/routes/payment.routes")(app);
const notification = require("./app/routes/notification.routes")(app);
const slot = require("./app/routes/slot.routes")(app);
const email = require("./app/routes/email.routes")(app);
const attachment = require("./app/routes/attachment.routes")(app);
const relative = require("./app/routes/relative.routes")(app);
const location = require("./app/routes/location.routes")(app);
const loginState = require("./app/routes/loginState.routes")(app);
const remark = require("./app/routes/remark.routes")(app);
const photo = require("./app/routes/photo.routes")(app);
const backup = require("./app/routes/backup.routes")(app);

//Database for Deleted Records-----------------------------------------------

const delAttachment = require("./app/delRoutes/delAttachment.routes")(app);
const delPayment = require("./app/delRoutes/delPayment.routes")(app);
const delPhoto = require("./app/delRoutes/delPhoto.routes")(app);
const delProfile = require("./app/delRoutes/delProfile.routes")(app);
const delRelative = require("./app/delRoutes/delRelative.routes")(app);
const delRemark = require("./app/delRoutes/delRemark.routes")(app);



app.get('/*',(req,res)=> {
  res.sendFile(__dirname+'/vendorManagement/index.html')
  
})


// set port, listen for requests (SET ROUTES)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);


});

const db = require("./app/models");
const Op = db.Sequelize.Op;
const Payment = db.payments;
const Profile = db.tutorials;
const Notification = db.notification;


var drop;

if (process.env.DROP == "true"){
  drop = true;
} else {
  drop = false;
}

var auto;

if (process.env.AUTO_EMAIL=="true"){

  auto = true;

} else {
  auto = false;
}







//Sync database and create administrator account-----------------------------------------------------------

db.sequelize.sync({force: drop}).then(()=> {
  
  const bcrypt = require('bcrypt')

  const db = require("./app/models");
  const AccountModel = require("./app/models/account.model");
  const Account = db.account;

  const cb = require("./app/models");
  const LoginModel = require("./app/models/loginState.model")
  const Login = cb.loginState;

  const IC_Number = process.env.ADMIN_IC;
  const rid = "ACC_"+IC_Number;
  const username = process.env.ADMIN_USER;
  const oldPassword = process.env.ADMIN_PASSWORD;
  const role = process.env.ADMIN_ROLE;
  const email = process.env.ADMIN_EMAIL;
  const last_Login = new Date();
  var saltRounds = 12;


  return new Promise (async (resolve)=> {
    await  bcrypt.hash(oldPassword,saltRounds,function(err,hash){
          password = hash;
          createData(password)
      })

      function createData(data) {

          var account = {
              rid:rid,
              username: username,
              password: data,
              email: email,
              IC_Number: IC_Number,
              last_Login: last_Login,
              role:role
          }

          var array = [];
          var accArray = [];

          Account.findAll({where: {username: username}}).then(result=> {
            array = result;
             if (array.length == 0){
              Account.create(account).then(data=> {
                accArray = data;

                var loginState = {
                  id: accArray.dataValues.id,
                  rid: accArray.dataValues.rid,
                  login_state: false
                }

                Login.create(loginState).then(data=> {
                 console.log("success login state updated") 
                }).catch(error=> {
                  console.log("cannot update login state")
                })
                

                console.log("Successfully created account")
              }).catch(err=> {
                console.log("Cannot create user account")
            });
            }
            console.log("Admin account is already existed")
          });


      }
      console.log("Drop table and resync");
  });
   

});



const date = new Date();
const day = date.getDate();
const month = date.getMonth()+1;
const year = date.getFullYear();
arrayPayment = [];






// schedule.scheduleJob({hour: 00, minute: 00}, function(){ ------------------------------------------------

schedule.scheduleJob('*/1 * * * *',function(){

  console.log("Server will execute gmail every 12:00")

if (auto){

  console.log("Automated notification is enabled ["+auto+"]")

  Profile.findAll().then(data=> {
    var profileData = data;

    if (profileData.length !== 0){
      
    

    
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

        console.log(day+".."+month+".."+year)
        console.log(due_DateDay+".."+due_DateMonth+".."+due_DateYear)

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
      }

        return new Promise (async (resolve)=> {

        
      
          for(let i = 0; i < arrayPayment.length; i++){

              Payment.findAll({where: {rid: arrayPayment[i].rid, due_Date: arrayPayment[i].latest_Due_Date }}).then(data=> {
                var payment = data;

                if(payment.length !== 0){
               

                var rid = arrayPayment[i].rid;
                var email = arrayPayment[i].email;
                var name = arrayPayment[i].name;
                var slot = arrayPayment[i].slot;
                var slot_Price = arrayPayment[i].slot_Price;
                var latest_Due_Date = arrayPayment[i].latest_Due_Date;
                var latest_Payment_Date = arrayPayment[i].latest_Payment_Date;
                var phone = arrayPayment[i].phone;
    
              
  
                if (payment[0].dataValues.send_Email == false){

  
                  const phoneNumber = "673"+phone;
                  const nexmo = new Nexmo({
                    apiKey: process.env.NEXMO_APIKEY,
                    apiSecret: process.env.NEXMO_APISECRET
                  })
                  
                  const from = 'VMS';
                  const to = phoneNumber;
                  console.log(to)
                  const text = 'Dear valued customer, your slot number: '+slot+' amounting $'+slot_Price+' due on '+latest_Due_Date+ '. Thank You';
              
                  nexmo.message.sendSms(from, to, text);
        
                  var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: process.env.EMAIL_USER,
                      pass: process.env.EMAIL_PASS
                    }
                  });
  
                  console.log("Email:"+email)

                  let emailMessage = (
                    '<h3>Dear '+ name +',</h3>'+
                    '<p>Account ID:'+rid+'<p>'+
                    '<p>Just for a reminder, your payment is now overdue, Please Refer to the table below for your upcoming payment: <p>'+

                    
                    '<table style="width:100%; margin: 0 auto;font-size: 14px; color: black; border: 1px solid gray">' +
                    '<thead>' +
                    '<th style="border: 1px solid gray; padding:8px 2px;"> Vendor Name</th>'  +
                    '<th style="border: 1px solid gray;padding:8px 2px;"> Slot Number </th>'  +
                    '<th style="border: 1px solid gray;padding:8px 2px;"> latest payment made </th>'  +
                    '<th style="border: 1px solid gray;padding:8px 2px; color: red"> Total Overdue Amount </th>'  +
                    '<th style="border: 1px solid gray;padding:8px 2px;"> Due Date </th>'  +
                    '</thead>' +
                    
                    '<tr style="text-align: center;">' +
                    '<td style="border: 1px solid gray;padding:8px 2px;">' + name + '</td>' +
                    '<td style="border: 1px solid gray;padding:8px 2px;">' + slot + '</td>' +
                    '<td style="border: 1px solid gray;padding:8px 2px;">' + latest_Payment_Date + '</td>' +
                    '<td style="border: 1px solid gray;padding:8px 2px; color: red">$' + slot_Price + '</td>' +
                    '<td style="border: 1px solid gray;padding:8px 2px;">' + latest_Due_Date + '</td>' +
                     
                    '</tr>'+
                    '</table>'+
                    '<p> If you already make the payment, please ignore the email and SMS reminder. Thank You </p>'
                  );
                  
                  var mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: email,
                    subject: '[Payment Overdue] Payment overdue for slot '+slot,
                    html: emailMessage
                  }
                  
                  transporter.sendMail(mailOptions, function(error,info){
                    if (error){
                      console.log(error)
                    } else {
  
                      
                      const notify = {
                        rid: "ACC_"+process.env.ADMIN_IC,
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
              }        
              })  
          }
        })
      }
    }).catch(err=> {
      console.log(err)
      return;
    });

} else {
  console.log(" Automated Notification is disabled ["+auto+"]")
}
});























//File Destination and name (Attach Function) Start -----------------------------------------------------

//Storage Ref
var storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null,'Attachment')       //set localhost storage
  },

  filename: function (req,file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+'.'+fileExtension(file.originalname))
  }
})

//Upload Setting

var upload = multer({
  storage: storage,

  limits: {
    fileSize: 80000000
  },

  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|pdf|gif)$/)){
      cb(new Error(('Please Upload JPG and PNG image')))
    }

    cb(undefined, true)
  }
});

const dbAtt = require("./app/models");
const AttahcmentModel = require("./app/models/attachment.model");
const Attachment = dbAtt.attachment;

app.post('/uploadfile', upload.single('image'), (req,res,next)=> {
  const file = req.file
  const vendor_rid = req.body.vendor_rid;
  const account_rid = req.body.account_rid;
  const rid = req.body.rid;
  const name = req.body.name;
  const link = file.path;
  const type = file.mimetype;
  const date_Uploaded = new Date();

  if (!file){
    const error = new Error('No File')
    error.httpStatusCode = 400
    return next(error)
  }

  var attachment = {
    name:name,
    vendor_rid: vendor_rid,
    account_rid: account_rid,
    rid: rid,
    link: link,
    date_Uploaded: date_Uploaded,
    type: file.mimetype
  }

  Attachment.create(attachment).then(data=> {
    res.send(data)
    
  }).catch(error=> {
    res.status(500).send({
      message:"Failed to create attachment"
    })
  })





},(error,req,res,next)=> {
  res.status(500).send({
    message: error.message
  })
})
























//File Destination and name (Profile Photo Function) Start -----------------------------------------------------

//Storage Ref
var storage1 = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null,'ProfilePhoto')       //set localhost storage
  },

  filename: function (req,file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+'.'+fileExtension(file.originalname))
  }
})

//Upload Setting

var uploadPic = multer({
  storage: storage1,

  limits: {
    fileSize: 10000000
  },

  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)){
      cb(new Error(('Please Upload JPG and PNG image')))
    }

    cb(undefined, true)
  }
});

const dbPhoto = require("./app/models");
const photoModel = require("./app/models/photo.model");
const Photo = dbAtt.photo;

app.post('/photo/uploadfile', uploadPic.single('image'), (req,res,next)=> {


  const file = req.file
  const rid = req.body.rid;
  console.log(file)
  const link = file.path;
  const date_Uploaded = new Date();

  if (!file){
    const error = new Error('No File')
    error.httpStatusCode = 400
    return next(error)
  }

  var attachment = {
    rid: rid,
    link: link,
    date_Uploaded: date_Uploaded
  }



   Photo.create(attachment).then(data=> {
      res.send(data)
              
      }).catch(error=> {
      res.status(500).send({
      message:"Failed to create attachment"
      })
  })

},(error,req,res,next)=> {
  res.status(500).send({
    message: error.message
  })

})














