module.exports = app => {
    const tcontroller = require("../../backup.js")
    var router = require("express").Router();

    router.post("/", tcontroller.backup);
    
    app.use('/api/backup', router)


}