const db = require("../models");
const loginStateModel = require("../models/loginState.model");
const Login = db.loginState;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    
    // if (!req.body.name){
    //     res.status(400).send({
    //         message: "Error, Content cannot be empty"
    //     });
    //     return;
    // }

   



    const notify = {
        id: req.body.id,
        rid: req.body.rid,
        login_state: req.body.login_state,
    };

    Login.create(notify).then(data=> {
        res.send(data);
    }).catch (error=> {
        res.status(500).send({
            message: error.message
        })
    })
    

};

exports.findAll = (req,res)=> {
    const rid = req.query.rid;
   

    Login.findAll().then(data=> {
        res.send(data)
    }).catch(err=> {
        res.status(500).send({
            message: err.message
        });
    });


};

exports.findOne = (req,res)=> {

    const id = req.params.id;

    Login.findByPk(id).then(data=> {
        res.send(data);
    })
    .catch(err=> {
        res.status(500).send({
            message: "Error retrieving Tutorial with id= "
        });
    });

};


exports.update = (req,res)=> {

    const id = req.params.id;
    
    Login.update(req.body, {
        where: {id:id}
    }).then(result => {
        if (result == 1) {
            res.send({ 
                message: "Notification was updated successfully"
            })
        } else {
            res.send( {
                message:`Cannot update Notification with id=${id}.No Result Found`
            })
        }
    }).catch (error => {
        res.status(500).send({
            message: "error when updating Notification"
        })
    })


};

exports.delete = (req,res)=> {

    const id = req.params.id;

    Login.destroy({
        where: {id:id}
    })
    .then(result=> {
        if (result == 1){
            res.send({
                message: "Slot has deleted successfully"
            })
        } else {
            res.send({
                message:"Slot Cannot be deleted. Empty or no result found"
            })
        }
    }).catch (error=> {
        res.status(500).send({
            message: "Error, could not delete notification"
        })
    })

};

exports.deleteByRid = (req,res)=> {
    const rid = req.params.rid;

    Login.destroy({
        where :{rid: rid}
    }).then(result=> {
        if (result ==1){
            res.send({
                message:"Slot has deleted Successfully "
            })
        } else {
            res.send({
                message:"Slot cannot be deleted. Empty or no result found"
            })
        }
    }).catch(error=> {
        res.status(500).send({
            message: "Error!"
        })
    })
}

exports.deleteAll= (req,res)=> {

    Login.destroy( {
        where: {},
        truncate: false
    }).then(result=> {
        res.send({
            message: `Notification were deleted successfully! ${result}`
        }).catch(error=> {
            message: error.message || "Error during deleting Notification"
        })
    })

};

exports.findAllbyRID = (req,res)=> {

    const rid = req.params.rid;
    Login.findAll({where: {rid:rid}}).then(data=> {
        res.send(data)
    }).catch(err=> {
        res.status(500).send({
            message:err.message
        })
    })
};

exports.findOnline = (req,res)=> {
    var state = true;
    Login.findAll({where: {login_state:state}}).then(data=> {
        res.send(data)
    }).catch(err=> {
        res.status(500).send({
            message:err.message
        })
    })
};



