module.exports = app => {
    const tcontroller = require("../delcontrollers/delRelative.controller.js")
    var router = require("express").Router();

    router.post("/",tcontroller.createRelative)
    router.get("/",tcontroller.findAll)
    router.get("/:rid",tcontroller.findAllbyRID)
    router.delete("/:id",tcontroller.delete)
    router.delete("/", tcontroller.deleteAll)
    router.put("/:id",tcontroller.update)
    router.get("/IC/:IC_Number",tcontroller.findByIC)
    router.get("/spouse/spouse",tcontroller.findAllSpouse)
    router.get("/child/child",tcontroller.findAllChild)
    

    app.use('/api/delrelative',router)

}