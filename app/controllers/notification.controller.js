const db = require("../models");
const notificationModel = require("../models/notification.model");
const Notification = db.notification;
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
        title: req.body.title, 
        description: req.body.description,
        category: req.body.category,
        date: req.body.date,
        view: req.body.view
    };

    Notification.create(notify).then(data=> {
        res.send(data);
    }).catch (error=> {
        res.status(500).send({
            message: error.message
        })
    })
    

};

exports.findAll = (req,res)=> {
    const rid = req.query.rid;
    var condition = rid ? { rid: {[Op.like]: `%${rid}%`}}: null;

    Notification.findAll({ where: condition }).then(data=> {
        res.send(data)
    }).catch(err=> {
        res.status(500).send({
            message: err.message
        });
    });


};

exports.findOne = (req,res)=> {

    const id = req.params.id;

    Notification.findByPk(id).then(data=> {
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
    
    Notification.update(req.body, {
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

    Notification.destroy({
        where: {id:id}
    })
    .then(result=> {
        if (result == 1){
            res.send({
                message: "Notification has deleted successfully"
            })
        } else {
            res.send({
                message:"Notification Cannot be deleted. Empty or no result found"
            })
        }
    }).catch (error=> {
        res.status(500).send({
            message: "Error, could not delete notification"
        })
    })

};

exports.deleteAll= (req,res)=> {

    Notification.destroy( {
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

exports.findAllview = (req,res)=> {
    Notification.findAll({where: {view: false}}).then (data=> {
        res.send(data)
    }).catch(err=> {
        res.status(500).send({
            message: err.message
        });
        
    });

};


exports.findAllbyRID = (req,res)=> {

    const rid = req.params.rid;
    var condition = rid ? { rid: {[Op.like]: `%${rid}`}}: null;
    Notification.findAll({where: condition}).then(data=> {
        res.send(data)
    }).catch(err=> {
        res.status(500).send({
            message:err.message
        })
    })
};

