const db = require("../models");
const AccountModel = require("../models/account.model");
const Account = db.account;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt')

exports.loginFunction = (req,res)=> {

    var creds = [];
    

    const username = req.body.username;
    const password = req.body.password;
    
    Account.findAll({where : {usename: username}}).then(data => {
      creds = data; 
      var storedPassword = creds.password;

      bcrypt.compare(password, storedPassword, function(error, result){
          if (result){
              res.send(data)
          } else {
              res.status(500).send({
                  message: "Login Failed, Password is incorrectt!"
              })
          }
      }).catch(error=>{
        res.status(500).send({
            message: "Cannot compare password hash! "
        })
    })

    }).catch(error=> {
        res.status(500).send({
            message: "Login Failed, cannot find username: "+username
        })
    })

}

exports.createAccount = (req,res)=> {

    var createdDate = new Date();


    const rid = "ACC_"+IC_Number
    const username = req.body.username;
    const oldPassword = req.body.password;
    const email = req.body.email;
    const IC_Number = req.body.IC_Number;
    const last_Login = createdDate;
    const role = req.body.role;
    var saltRounds = 12;

    bcrypt.hash(oldPassword,saltRounds,function(error,hash){
        const password = hash;

        var account = {
            rid:rid,
            username: username,
            password: password,
            email: email,
            IC_Number: IC_Number,
            last_Login: last_Login,
            role:role
        }

        Account.create(account).then(data=> {
            res.send(data)
        }).catch(err=> {
            res.status(500).send({
                message: "Cannot create account with username: "+username
            })
        });

        if (error){
            res.status(500).send({
                message: "Cannot encrypt password with username: "+username
            })
        }   

    }).catch(err=> {

        res.status(500).send({
            message: "Cannot encrypt password with username: "+username
        })

    })
};

exports.update = (req,res) => {

    const rid = req.params.rid;

    Account.update(req.body, {where: {rid: rid}}).then(result=> {
        if (result == 1){
            res.send("Successfully update user account with rid: "+rid)
        } else {
            res.send({
                message: "Cannot Update with RID: "+rid
            })
        }
    }).catch(error=> {
        res.status(500).send({
            message: "Cannot Update with RID: "+rid
        })
    })
};

exports.findAll = (req,res)=> {

    Account.findAll().then(result=> {
            res.send(result);
    }).catch(err=> {
            res.status(500).send({
            message: "Cannot find all objects !"
        })
    })
}

exports.findAllbyRID = (req,res) => {
    const rid = req.params.rid;

    Account.findAll({where: {rid: rid}}).then(result=> {
        res.send(result)
    }).catch(err=> {
        res.status(500).send({
        message: "Cannot find data with RID: "+rid 
    });
})
};

exports.delete = (req,res) => {

    const rid = req.params.rid;

    Account.destroy({where: {rid:rid}}).then(result=> {
        if (result == 1){

            res.send({
                message: "Successfully deleted User Account"
            })

        } else {
            res.send({
                message: "Cannot Delete user Account (ERROR)"
            })
        }
    }).catch(error=> {
    res.status(500).send({
        message: "Cannot Delte user Account (ERROR)"
    })
})
};

exports.deleteAll = (req,res)=> {
    Account.destroy({where: {}, truncate: false}).then(result=> {
        res.send({
        message: "Successfully delete all user account"
    })
    }).catch(error=> {
        res.status(500).send({
        message:"Error, cannot delete user account!"
    })
})
};