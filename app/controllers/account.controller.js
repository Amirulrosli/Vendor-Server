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
              return;
          }

      
              res.status(500).send({
                  message:"could not complete the process"
              })
          
        });
    

    }).catch(error=> {
        res.status(500).send({
            message: "Login Failed, cannot find username"
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
                    message: "Cannot create account"
                })
            });

        }
    });
};

exports.update = (req,res)=> {

    const bcrypt = require('bcrypt')

    const id = req.params.id;
    const oldPassword = req.body.password;
    var saltRounds = 12;
    var newPassword;

    Account.findAll({where:{id:id}}).then(result=> {
        var password = result[0].dataValues.password;

        if (password !== oldPassword){

           

            return new Promise (async (resolve)=> {
                await  bcrypt.hash(oldPassword,saltRounds,function(err,hash){
                newPassword = hash;
                req.body.password = newPassword;
                updateData(req.body)
                })
            })


        } else {
            updateData(req.body)
        }
        
    })
    function updateData(data){

        Account.update(data, {
            where: {id:id}
        }).then(result => {
            if (result == 1) {
                res.send({ 
                    message: "Profile was updated successfully"
                })
            } else {
                res.send( {
                    message:`Cannot update profile with id=${id}.No Result Found`
                })
            }
        }).catch (error => {
            res.status(500).send({
                message: "error when updating profile"
            })
        })

    }

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

exports.findAllbyID = (req,res) => {
    const id = req.params.id;

    Account.findAll({where: {id: id}}).then(result=> {
        res.send(result)
    }).catch(err=> {
        res.status(500).send({
        message: "Cannot find data with ID: "+id 
    });
})
};

exports.findbyUsername = (req,res) => {
    const username = req.params.username;

    Account.findAll({where:{username:username}}).then(result=> {
        res.send(result)
    }).catch(error=> {
        res.status(500).send({
            message: "Error, please try again"
        })
    })
}

exports.findByIC = (req,res) => {
    const IC_Number = req.params.IC_Number;

    Account.findAll({where: {IC_Number: IC_Number}}).then(result=> {
        res.send(result)
    }).catch(error=> {
        res.status(500).send({
            message:"Cannot find IC Number in Account table"
        })
    })
}

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





