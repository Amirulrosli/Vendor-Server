const db = require("../models");
const tutorialModel = require("../models/Payment.model");
const Payment = db.payments;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    
    // if (!req.body.name){
    //     res.status(400).send({
    //         message: "Error, Content cannot be empty"
    //     });
    //     return;
    // }



    const payment = {
        id: req.body.id,
        rid: req.body.rid,
        payment_Date: req.body.payment_Date, 
        due_Date: req.body.due_Date,
        email: req.body.email,
        send_Email: req.body.send_Email,
        price: req.body.price
    };

    Payment.create(payment).then(data=> {
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

    Payment.findAll({ where: condition }).then(data=> {
        res.send(data)
    }).catch(err=> {
        res.status(500).send({
            message: err.message
        });
    });


};

exports.findOne = (req,res)=> {

    const rid = req.params.rid;

    Payment.findByPk(rid).then(data=> {
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
    
    Payment.update(req.body, {
        where: {id:id}
    }).then(result => {
        if (result == 1) {
            res.send({ 
                message: "Payment was updated successfully"
            })
        } else {
            res.send( {
                message:`Cannot update payment with id=${id}.No Result Found`
            })
        }
    }).catch (error => {
        res.status(500).send({
            message: "error when updating Payment"
        })
    })


};

exports.delete = (req,res)=> {

    const id = req.params.id;

    Payment.destroy({
        where: {id:id}
    })
    .then(result=> {
        if (result == 1){
            res.send({
                message: "Payment has deleted successfully"
            })
        } else {
            res.send({
                message:"Payment Cannot be deleted. Empty or no result found"
            })
        }
    }).catch (error=> {
        res.status(500).send({
            message: "Error, could not delete payment"
        })
    })

};

exports.deleteAll= (req,res)=> {

    Payment.destroy( {
        where: {},
        truncate: false
    }).then(result=> {
        res.send({
            message: `Payment were deleted successfully! ${result}`
        }).catch(error=> {
            message: error.message || "Error during deleting Payment"
        })
    })

};

exports.findAllsend = (req,res)=> {
    Payment.findAll({where: {sendEmail: false}}).then (data=> {
        res.send(data)
    }).catch(err=> {
        res.status(500).send({
            message: err.message
        });
        
    });

};



exports.findAllbyRID = (req,res)=> {

    const rid = req.params.rid;
    Payment.findAll({where: {rid:rid}}).then(data=> {
        res.send(data)
    }).catch(err=> {
        res.status(500).send({
            message:err.message
        })
    })
};