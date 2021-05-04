const db = require("../models");
const relativeModel = require("../models/relative.model");
const Relative = db.relative;
const Op = db.Sequelize.Op;



exports.createRelative = (req,res)=> {

    const rid = req.body.rid;
    const name = req.body.name;
    const IC_Number = req.body.IC_Number;
    const relationship = req.body.relationship;

    var relative = {
        rid:rid,
        name: name,
        IC_Number: IC_Number,
        relationship: relationship
    }
    Relative.create(relative).then(data=> {
        res.send(data)
    }).catch(err=> {
        res.status(500).send({
            message: "Cannot create account with username: "+username
        })
    })   
};

exports.update = (req,res) => {

    const id = req.params.id;

    Relative.update(req.body, {where: {id: id}}).then(result=> {
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

    Relative.findAll().then(result=> {
            res.send(result);
    }).catch(err=> {
            res.status(500).send({
            message: "Cannot find all objects !"
        })
    })
}

exports.findAllbyRID = (req,res) => {
    const rid = req.params.rid;

    Relative.findAll({where: {rid: rid}}).then(result=> {
        res.send(result)
    }).catch(err=> {
        res.status(500).send({
        message: "Cannot find data with RID: "+rid 
    });
})
};

exports.delete = (req,res) => {

    const id = req.params.id;

    Relative.destroy({where: {id:id}}).then(result=> {
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
    Relative.destroy({where: {}, truncate: false}).then(result=> {
        res.send({
        message: "Successfully delete all user account"
    })
    }).catch(error=> {
        res.status(500).send({
        message:"Error, cannot delete user account!"
    })
})
};