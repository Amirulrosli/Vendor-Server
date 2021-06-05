const db = require("../models");
const attachmentModel = require("../delModel/delAttachment.model");
const Attachment = db.delAttachment;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');

exports.create = (req, res) => {
    


    Attachment.create(req.body).then(data=> {
        res.send(data);
    }).catch (error=> {
        res.status(500).send({
            message: error.message
        })
    })
    

};


exports.update = (req,res)=> {

    const id = req.params.id;
    
    Attachment.update(req.body, {
        where: {id:id}
    }).then(result => {
        if (result == 1) {
            res.send({ 
                message: "attachment was updated successfully"
            })
        } else {
            res.send( {
                message:`Cannot update attachment with id=${id}.No Result Found`
            })
        }
    }).catch (error => {
        res.status(500).send({
            message: "error when updating attachment"
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