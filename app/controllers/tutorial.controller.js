const db = require("../models");
const tutorialModel = require("../models/tutorial.model");
const Profile = db.tutorials;
const Op = db.sequelize.Op;




exports.create = (req, res) => {
    
    if (!req.body.name){
        res.status(400).send({
            message: "Error, Content cannot be empty"
        });
        return;
    }

    date_Now = new Date();
    let today = date_Now.getDate()+""+(date_Now.getMonth()+1)+""+date_Now.getFullYear();

    var rid = "V_01"+req.body.slot+today+"0000"+req.body.IC_Number;

    


    const profile = {
        id: req.body.id,
        rid: rid,
        name: req.body.name,
        IC_Number: req.body.IC_Number,
        email: req.body.email,
        latest_Payment: req.body.latest_Payment,
        latest_Payment_Date: req.body.latest_Payment_Date,
        overdue: req.body.overdue,
        slot: req.body.slot,
        slot_Price: req.body.slot_Price,
        phone: req.body.phone

    };



    Profile.create(profile).then(data=> {
        res.send(data);
    }).catch (error=> {
        res.status(500).send({
            message: error.message
        })
    })
    

};

exports.findAll = (req,res)=> {
    const IC_Number = req.query.IC_Number;
    var condition = IC_Number ? { IC_Number: {[Op.like]: `%${IC_Number}%`}}: null;

    Profile.findAll({ where: condition }).then(data=> {
        res.send(data)
    }).catch(err=> {
        res.status(500).send({
            message: err.message
        });
    });


};

exports.findOne = (req,res)=> {

    const id = req.params.id;

    profile.findByPk(id).then(data=> {
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
    
    Profile.update(req.body, {
        where: {id:id}
    }).then(result => {
        if (result == 1) {
            res.send({ 
                message: "Profile was updated successfully"
            })
        } else {
            res.send( {
                message:`Cannot update profile with id=${id}.No Result Found`
            })
        }
    }).catch (error => {
        res.status(500).send({
            message: "error when updating profile"
        })
    })


};

exports.delete = (req,res)=> {

    const id = req.params.id;

    Profile.destroy({
        where: {id:id}
    })
    .then(result=> {
        if (result == 1){
            res.send({
                message: "Profile has deleted successfully"
            })
        } else {
            res.send({
                message:"Profile Cannot be deleted. Empty or no result found"
            })
        }
    }).catch (error=> {
        res.status(500).send({
            message: "Error, could not delete profile"
        })
    })

};

exports.deleteAll= (req,res)=> {

    Profile.destroy( {
        where: {},
        truncate: false
    }).then(result=> {
        res.send({
            message: `Profile were deleted successfully! ${result}`
        }).catch(error=> {
            message: error.message || "Error during deleting the profile"
        })
    })

};

exports.findAlloverdue = (req,res)=> {
    Profile.findAll({where: {overdue: true}}).then (data=> {
        res.send(data)
    }).catch(err=> {
        res.status(500).send({
            message: err.message
        });
        
    });

};