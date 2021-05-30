module.exports = app => {
    const tcontroller = require("../controllers/photo.controller.js")
    var router = require("express").Router();

    // router.post("/",tcontroller.createAttachment)
    router.get("/",tcontroller.findAll)
    router.get("/id/:id",tcontroller.findAllbyID)
    router.get("/rid/:rid",tcontroller.findAllbyRID)
    router.delete("/:id",tcontroller.delete)
    router.delete("/", tcontroller.deleteAll)
    // router.put("/update/:id",tcontroller.update)
    router.post("/",tcontroller.create)

    app.use('/api/photo',router)

}