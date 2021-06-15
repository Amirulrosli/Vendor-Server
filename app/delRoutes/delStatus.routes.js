module.exports = app => {
    const tcontroller = require("../delcontrollers/delStatus.controller.js")
    var router = require("express").Router();

    router.post("/",tcontroller.create)
    router.get("/",tcontroller.findAll)
    router.get("/rid/:rid",tcontroller.findAllbyRID)
    router.delete("/:id",tcontroller.delete)
    router.delete("/", tcontroller.deleteAll)
    router.put("/update/:id",tcontroller.update)

    app.use('/api/delstatus',router)

}