const db = require("../models");
const attachmentModel = require("../models/attachment.model");
const Attachment = db.attachment;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const fs = require('fs')

const express = require("express");
const app = express();
const fileUpload = require('express-fileupload')
app.use(fileUpload());



// exports.createAttachment = (req,res)=> {
    
//     var createdDate = new Date();
//     let sampleFile;
//     let uploadPath;


//     const vendor_rid = req.body.vendor_rid
//     const account_rid = req.body.account_rid;
//     const date_Uploaded = createdDate;
  

//     if (!req.files || Object.keys(req.files).length === 0){
//         res.status(500).send('No Files were uploaded')
//     }

//     //name of input name
//     sampleFile = req.file;
//     console.log(sampleFile)
//     const attachmentRID = "ATT_"+ sampleFile.name + "vendor_rid";


//     uploadPath = __dirname + '\\Attachment\\'+sampleFile.name;

//     //mv() to move to directory

//     sampleFile.mv(uploadPath, function(error){

//         if (err){
//             res.status(500).send(err);
//         }

//         res.send("File uploaded successfully")
//        const linkURL = uploadPath;

//         var attachment = {
//             vendor_rid: vendor_rid,
//             account_rid: account_rid,
//             link: linkURL,
//             date_Uploaded: date_Uploaded,
//             rid: attachmentRID
//         }


        
//          Attachment.create(attachment).then(data=> {
//             res.send(data)
//          }).catch(err=> {
//             res.status(500).send({
//             message: "Cannot create account with : "+username
//          })

//         }) 
    

//     }).catch(error=> {
//         res.status(500).send(error)
//     })  
// };

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
        message: "Cannot find data with RID: "+rid 
    });
})
};

exports.findAllbyVendorRID = (req,res) => {
    const vendor_rid = req.params.vendor_rid;

    Attachment.findAll({where: {vendor_rid: vendor_rid}}).then(result=> {
        res.send(result)
    }).catch(err=> {
        res.status(500).send({
        message: "Cannot find data with RID: "+rid 
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