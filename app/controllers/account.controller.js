const db = require("../models");
const AccountModel = require("../models/account.model");
const Account = db.account;
const Op = db.Sequelize.Op;


exports.loginFunction = (req,res)=> {

    const bcrypt = require('bcrypt')

    var creds = [];
    

    const username = req.body.username;
    const password = req.body.password;
    
    Account.findAll({where : {username: username}}).then(data => {
        creds = data; 
        
        var storedPassword = creds[0].dataValues.password;
    
        bcrypt.compare(password, storedPassword, function(error, result){
          if (result){
              res.send(data[0])
          }

          if (error){
              res.status(500).send({
                  message:"could not complete the process"
              })
          }
        })
    

    }).catch(error=> {
        res.status(500).send({
            message: "Login Failed, cannot find username: "+username
        })
    })


}

exports.createAccount = (req,res)=> {

    const bcrypt = require('bcrypt')

    let password;

    const username = req.body.username;
    const oldPassword = req.body.password;
    const email = req.body.email;
    const IC_Number = req.body.IC_Number;
    const last_Login = req.body.last_Login;
    const role = req.body.role;
    const rid = "ACC_"+IC_Number
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
    
            Account.create(account).then(data=> {
                res.send(data)
            }).catch(err=> {
                res.status(500).send({
                    message: "Cannot create account with username: "+username
                })
            });

        }
    });
};

exports.update = (req,res) => {

    const id = req.params.id;

    Account.update(req.body, {where: {id: id}}).then(result=> {
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

    const id = req.params.id;

    Account.destroy({where: {id:id}}).then(result=> {
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