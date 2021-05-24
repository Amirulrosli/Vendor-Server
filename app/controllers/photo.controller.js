const db = require("../models");
const photoModel = require("../models/photo.model");
const Photo = db.photo;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');

const multer = require('multer')
const fileExtension = require('file-extension')

const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');





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

  

// exports.update = (upload.single('image'), (req,res,next)=> {

//     const file = req.file
//     const rid = req.body.rid;
//     const link = file.path;
//     const date_Uploaded = new Date();
//     const id = req.params.id;
  
//     if (!file){
//       const error = new Error('No File')
//       error.httpStatusCode = 400
//       return next(error)
//     }
  
//     var attachment = {
//       id: id,
//       rid: rid,
//       link: link,
//       date_Uploaded: date_Uploaded
//     }


//     Photo.update(attachment, {where: {id: id}}).then(result=> {
//         if (result == 1){
//             res.send("Successfully update user account with rid: ")
//         } else {
//             res.send({
//                 message: "Cannot Update with RID: "
//             })
//         }
//     }).catch(error=> {
//         res.status(500).send({
//             message: "Cannot Update with RID: "
//         })
//     })

//   },(error,req,res,next)=> {
//     res.status(500).send({
//       message: error.message
//     })
//   })
  





exports.findAll = (req,res)=> {

    Photo.findAll().then(result=> {
            res.send(result);
    }).catch(err=> {
            res.status(500).send({
            message: "Cannot find all objects !"
        })
    })
}

exports.findAllbyID = (req,res) => {
    const id = req.params.id;

    Photo.findAll({where: {id: id}}).then(result=> {
        res.send(result)
    }).catch(err=> {
        res.status(500).send({
        message: "Cannot find data with RID: "
    });
})
};

exports.findAllbyRID = (req,res) => {
    const rid = req.params.rid;

    Photo.findAll({where: {rid: rid}}).then(result=> {
        res.send(result)
    }).catch(err=> {
        res.status(500).send({
        message: "Cannot find data with RID: "
    });
})
};

exports.delete = (req,res) => {

    const id = req.params.id;

    Photo.destroy({where: {id:id}}).then(result=> {
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
    Photo.destroy({where: {}, truncate: false}).then(result=> {
        res.send({
        message: "Successfully delete all user account"
    })
    }).catch(error=> {
        res.status(500).send({
        message:"Error, cannot delete user account!"
    })
})
};