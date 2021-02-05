const db = require("../models");
const slotModel = require("../models/slot.model");
const Slot = db.slot;
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
        slot_Number: req.body.slot_Number
    };

    Slot.create(notify).then(data=> {
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

    Slot.findAll({ where: condition }).then(data=> {
        res.send(data)
    }).catch(err=> {
        res.status(500).send({
            message: err.message
        });
    });


};

exports.findOne = (req,res)=> {

    const id = req.params.id;

    Slot.findByPk(id).then(data=> {
        res.send(data);
    })
    .catch(err=> {
        res.status(500).send({
            message: "Error retrieving Tutorial with id= "+id
        });
    });

};

exports.update = (req,res)=> {

    const id = req.params.id;
    
    Slot.update(req.body, {
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

    Slot.destroy({
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

    Slot.destroy( {
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
    var condition = rid ? { rid: {[Op.like]: `%${rid}`}}: null;
    Slot.findAll({where: condition}).then(data=> {
        res.send(data)
    }).catch(err=> {
        res.status(500).send({
            message:err.message
        })
    })
};


exports.findbySlot = (req,res)=> {

    const slot_Number = req.params.slot_Number;
    var condition = slot_Number ? { slot_Number: {[Op.like]: `%${slot_Number}`}}: null;
    Slot.findAll({where: condition}).then(data=> {
        res.send(data)
    }).catch(err=> {
        res.status(500).send({
            message:err.message
        })
    })
};

