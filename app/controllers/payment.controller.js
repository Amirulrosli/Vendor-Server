
const db = require("../models");
const tutorialModel = require("../models/Payment.model");
const Payment = db.payments;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

 
    if (req.body.paymentID==null || !req.body.paymentID){

        var rid = req.body.rid;

        var date_Now = new Date();
        let today = date_Now.getDate()+""+(date_Now.getMonth()+1)+""+date_Now.getFullYear();
        let time = date_Now.getHours()+""+date_Now.getMinutes()+""+date_Now.getSeconds();
        var length = rid.length;
        var sub = rid.length - 6;
        var IC = rid.substring(sub,length)

        req.body.paymentID = "P01_"+today+time;

    }


    var paymentID = req.body.paymentID;
   

    
    const payment = {
        id: req.body.id,
        paymentID: paymentID,
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
    Payment.findAll({where: {send_Email: true}}).then(data=> {
        res.send(data)
    }).catch(err=> {
        res.status(500).send({
            message: err.message
        });
        
    });

};

exports.findAllNotDelivered = (req,res)=> {
    Payment.findAll({where: {send_Email: false}}).then (data=> {
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

exports.findAllbyPaymentID = (req,res)=> {

    const paymentID = req.params.paymentID;
    Payment.findAll({where: {paymentID:paymentID}}).then(data=> {
        res.send(data)
    }).catch(err=> {
        res.status(500).send({
            message:err.message
        })
    })
};


exports.findAllbyPaymentDate = (req,res)=> {

    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    console.log(startDate+"  "+endDate)

    Payment.findAll({where: {
        payment_Date:{
            [Op.between]: [startDate, endDate],
        }
    }}).then(data=> {
        res.send(data)
    }).catch(err=> {
        res.status(500).send({
            message:err.message
        })
    })
};