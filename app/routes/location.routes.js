module.exports = app => {
    const tcontroller = require("../controllers/location.controller.js")
    var router = require("express").Router();

    router.post("/",tcontroller.create)
    router.get("/",tcontroller.findAll)
    router.get("/location/:location",tcontroller.findByLocation)
    router.get("/:id",tcontroller.findOne)
    router.delete("/:id",tcontroller.delete)
    router.delete("/", tcontroller.deleteAll)
    router.put("/id/:id",tcontroller.update)
    

    app.use('/api/location',router)

}