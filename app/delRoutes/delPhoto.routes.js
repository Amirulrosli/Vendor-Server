module.exports = app => {
    const tcontroller = require("../delcontrollers/delPhoto.controller.js")
    var router = require("express").Router();

    router.post("/",tcontroller.create)
    router.get("/",tcontroller.findAll)
    router.get("/id/:id",tcontroller.findAllbyID)
    router.get("/rid/:rid",tcontroller.findAllbyRID)
    router.delete("/:id",tcontroller.delete)
    router.delete("/", tcontroller.deleteAll)
    // router.put("/update/:id",tcontroller.update)
    // router.post("/",tcontroller.uploadFile)

    app.use('/api/delphoto',router)

}