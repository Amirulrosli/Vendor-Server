module.exports = app => {
    const tcontroller = require("../controllers/email.controller.js")
    var router = require("express").Router();

    router.post("/", tcontroller.sendMailing);
    
    app.use('/api/email', router)


}