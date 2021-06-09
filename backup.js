var fs = require("fs-extra");



exports.backup = (req, res) => {

if (!req.body.name){
    res.status(400).send({
        message: "Error, Content cannot be empty"
    });
    return;
}

var source = __dirname+'\\Attachment';
console.log(source)
var destination = '\\\\'+process.env.BACK_IP+'\\Users\\Lenovo\\VendorServer\\Attachment'
 console.log(destination)
// copy source folder to destination
fs.copy(source, destination, function (err) {
    if (err){
        res.status(500).send({
            message: "Cannot Copy Attachment, backup server is not connected"
        })
        return console.error(err)
    }

    var source1 = __dirname+'\\ProfilePhoto';
    console.log(source1)
    var destination1 = '\\\\'+process.env.BACK_IP+'\\Users\\Lenovo\\VendorServer\\ProfilePhoto'
    console.log(destination1)

    // copy source folder to destination

    fs.copy(source1, destination1, function (err) {
        if (err){
            res.status(500).send({
                message: "Cannot Copy ProfilePhoto, backup server is not connected"
            })
            return console.error(err)
        }

    res.status(200).send({
        message: "successfully backup attachment and profile Photo"
    })
    });
});









}