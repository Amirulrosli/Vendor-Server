const db = require("../models");
const attachmentModel = require("../models/attachment.model");
const Attachment = db.attachment;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const fs = require('fs')


exports.update = (req,res) => {

    const id = req.params.id;

    Attachment.update(req.body, {where: {id: id}}).then(result=> {
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

    Attachment.findAll().then(result=> {
            res.send(result);
    }).catch(err=> {
            res.status(500).send({
            message: "Cannot find all objects !"
        })
    })
}

exports.findAllbyID = (req,res) => {
    const id = req.params.id;

    Attachment.findAll({where: {id: id}}).then(result=> {
        res.send(result)
    }).catch(err=> {
        res.status(500).send({
        message: "Cannot find data with RID: "
    });
})
};

exports.findAllbyVendorRID = (req,res) => {
    const vendor_rid = req.params.vendor_rid;

    Attachment.findAll({where: {vendor_rid: vendor_rid}}).then(result=> {
        res.send(result)
    }).catch(err=> {
        res.status(500).send({
        message: "Cannot find data with RID: "
    });
})
};

exports.delete = (req,res) => {

    const id = req.params.id;

    Attachment.destroy({where: {id:id}}).then(result=> {
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
    Attachment.destroy({where: {}, truncate: false}).then(result=> {
        res.send({
        message: "Successfully delete all user account"
    })
    }).catch(error=> {
        res.status(500).send({
        message:"Error, cannot delete user account!"
    })
})
};