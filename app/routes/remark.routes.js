module.exports = app => {
    const tcontroller = require("../controllers/remark.controller.js")
    var router = require("express").Router();

    router.post("/",tcontroller.create)
    router.get("/",tcontroller.findAll)
    router.get("/:id",tcontroller.findOne)
    router.delete("/:id",tcontroller.delete)
    router.delete("/", tcontroller.deleteAll)
    router.put("/id/:id",tcontroller.update)
    router.get("/rid/:rid", tcontroller.findAllbyRID)
    

    app.use('/api/remark',router)

}