const db = require("../models");
const statusModel = require("../delModel/delStatus.model");
const Status = db.delStatus;
const Op = db.Sequelize.Op;



exports.create = (req,res)=> {

    const rid = req.body.rid;
    const status = req.body.status;
    const overdue_Day = req.body.overdue_Day;
    const last_Payment_Date = req.body.last_Payment_Date;
    const next_Payment_Date = req.body.next_Payment_Date;

    var status1 = {
        rid:rid,
        status: status,
        overdue_Day: overdue_Day,
        last_Payment_Date: last_Payment_Date,
        next_Payment_Date: next_Payment_Date,

    }
    Status.create(status1).then(data=> {
        res.send(data)
    }).catch(err=> {
        res.status(500).send({
            message: "Cannot create account with respective username"
        })
    })   
};

exports.update = (req,res) => {

    const id = req.params.id;

    Status.update(req.body, {where: {id: id}}).then(result=> {
        if (result == 1){
            res.send({
                message:"Successfully update relative with rid: "})
        } else {
            res.send({
                message: "Cannot Update with RID: "
            })
        }
    }).catch(error=> {
        res.status(500).send({
            message: "Cannot Update with RID: "
        })
    })
};

exports.findAll = (req,res)=> {

Status.findAll().then(result=> {
            res.send(result);
    }).catch(err=> {
            res.status(500).send({
            message: "Cannot find all objects !"
        })
    })
}

exports.findAllbyRID = (req,res) => {
    const rid = req.params.rid;

    Status.findAll({where: {rid: rid}}).then(result=> {
        res.send(result)
    }).catch(err=> {
        res.status(500).send({
        message: "Cannot find data with RID: "+rid 
    });
})
};


exports.delete = (req,res) => {

    const id = req.params.id;

    Status.destroy({where: {id:id}}).then(result=> {
        if (result == 1){

            res.send({
                message: "Successfully deleted User Account"
            })

        } else {
            res.send({
                message: "Cannot Delte user Account (ERROR)"
            })
        }
    }).catch(error=> {
    res.status(500).send({
        message: "Cannot Delte user Account (ERROR)"
    })
})
};

exports.deleteAll = (req,res)=> {
    Status.destroy({where: {}, truncate: false}).then(result=> {
        res.send({
        message: "Successfully delete all user account"
    })
    }).catch(error=> {
        res.status(500).send({
        message:"Error, cannot delete user account!"
    })
})
};
