const db = require("../models");
const relativeModel = require("../delModel/delRelative.model");
const Relative = db.delRelative;
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
            res.send({
                message:"Successfully update user account with rid: "})
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

exports.findAllSpouse = (req,res) => {
    const spouse = "spouse"

    Relative.findAll({where: {relationship: spouse}}).then(result=> {
        res.send(result)
    }).catch(err=> {
        res.status(500).send({
        message: "Cannot find data with RID: "+rid 
    });
})
};

exports.findAllChild = (req,res) => {
    const child = "child"

    Relative.findAll({where: {relationship: child}}).then(result=> {
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

exports.findByIC = (req,res) => {
    const IC_Number = req.params.IC_Number;


    Relative.findAll({where: {IC_Number: IC_Number}}).then(result => {
        res.send(result);
    }).catch(err => {
        res.status(500).send({
            message: "error, Cannot Find Data"
        })
    })
}