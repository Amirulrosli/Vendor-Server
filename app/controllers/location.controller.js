const { location } = require("../models");
const db = require("../models");
const locationModel = require("../models/location.model");
const Location = db.location;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    
    // if (!req.body.name){
    //     res.status(400).send({
    //         message: "Error, Content cannot be empty"
    //     });
    //     return;
    // }

    var date = new Date();
    var count = 0;

    if(!req.body.location){
        res.status(400).send({
                    message: "Error, Content cannot be empty"
                });
                return;
    }

    const location = {
        location: req.body.location,
        date_Updated: date,
        total_Slot: count  
    };

    Location.create(location).then(data=> {
        res.send(data);
    }).catch (error=> {
        res.status(500).send({
            message: error.message
        })
    })
    

};

exports.findAll = (req,res)=> {

    Location.findAll().then(data=> {
        res.send(data)
    }).catch(err=> {
        res.status(500).send({
            message: err.message
        });
    });


};

exports.findOne = (req,res)=> {

    const id = req.params.id;

    Location.findByPk(id).then(data=> {
        res.send(data);
    })
    .catch(err=> {
        res.status(500).send({
            message: "Error retrieving Tutorial"
        });
    });

};

exports.update = (req,res)=> {

    const id = req.params.id;
    
    Location.update(req.body, {
        where: {id:id}
    }).then(result => {
        if (result == 1) {
            res.send({ 
                message: "location was updated successfully"
            })
        } else {
            res.send( {
                message:`Cannot update location with id=${id}.No Result Found`
            })
        }
    }).catch (error => {
        res.status(500).send({
            message: "error when updating location"
        })
    })


};

exports.delete = (req,res)=> {

    const id = req.params.id;

    Location.destroy({
        where: {id:id}
    })
    .then(result=> {
        if (result == 1){
            res.send({
                message: "Location has deleted successfully"
            })
        } else {
            res.send({
                message:"location Cannot be deleted. Empty or no result found"
            })
        }
    }).catch (error=> {
        res.status(500).send({
            message: "Error, could not delete location"
        })
    })

};


exports.deleteAll= (req,res)=> {

    Location.destroy( {
        where: {},
        truncate: false
    }).then(result=> {
        res.send({
            message: `Notification were deleted successfully! ${result}`
        }).catch(error=> {
            message: error.message || "Error during deleting Notification"
        })
    })

};

exports.findByLocation = (req,res) => {
    const location = req.params.location;

    Location.findAll({where: {location:location}}).then(resp=> {
        res.send(resp)
    }).catch(error=> {
        res.status(500).send({
            message: "Error, cannot find location"
        })
    })
}



