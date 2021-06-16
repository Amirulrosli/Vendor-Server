module.exports = app => {
    const tcontroller = require("../delcontrollers/delProfile.controller.js")
    var router = require("express").Router();

    router.post("/", tcontroller.create);
    router.get("/",tcontroller.findAll)
    router.get("/overdue", tcontroller.findAlloverdue)
    router.get("/paid", tcontroller.findAllPaid)
    router.get("/find", tcontroller.findAllFerence)
    router.get("/:id",tcontroller.findOne)
    router.put("/update/:id",tcontroller.update)
    router.delete("/:id",tcontroller.delete)
    router.delete("/", tcontroller.deleteAll)
    router.get("/IC/:IC_Number", tcontroller.findAllbyIC)
    router.get("/rid/:rid",tcontroller.findAllbyRID)

    app.use('/api/delprofiles', router)


}