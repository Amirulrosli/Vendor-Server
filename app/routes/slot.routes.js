module.exports = app => {
    const tcontroller = require("../controllers/slot.controller.js")
    var router = require("express").Router();

    router.post("/", tcontroller.create);
    router.get("/",tcontroller.findAll)
    router.get("/:id",tcontroller.findOne)
    router.put("/update/:id",tcontroller.update)
    router.delete("/:id",tcontroller.delete)
    router.delete("/", tcontroller.deleteAll)
    router.delete("/rid/:rid", tcontroller.deleteByRid)
    router.get("/rid/:rid",tcontroller.findAllbyRID)
    router.get("/slot/:slot_Number",tcontroller.findbySlot)
    router.get("/location/:location",tcontroller.findByLocation)
    router.get("/taken/:taken",tcontroller.findBytaken)
    router.get("/available/:available",tcontroller.findByAvailable)

    app.use('/api/slots', router)


}