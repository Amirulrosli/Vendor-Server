module.exports = app => {
    const tcontroller = require("../controllers/attachment.controller.js")
    var router = require("express").Router();

    router.post("/",tcontroller.create)
    router.get("/",tcontroller.findAll)
    router.get("/id/:id",tcontroller.findAllbyID)
    router.get("/vendor_rid/:vendor_rid",tcontroller.findAllbyVendorRID)
    router.delete("/:id",tcontroller.delete)
    router.delete("/", tcontroller.deleteAll)
    router.put("/update/:id",tcontroller.update)

    app.use('/api/attachment',router)

}