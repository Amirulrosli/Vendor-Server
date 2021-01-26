module.exports = app => {
    const tcontroller = require("../controllers/notification.controller.js")
    var router = require("express").Router();

    router.post("/", tcontroller.create);
    router.get("/",tcontroller.findAll)
    router.get("/view", tcontroller.findAllview)
    router.get("/:id",tcontroller.findOne)
    router.put("/update/:id",tcontroller.update)
    router.delete("/:id",tcontroller.delete)
    router.delete("/", tcontroller.deleteAll)
    router.get("/rid/:rid",tcontroller.findAllbyRID)
    
    app.use('/api/notifications', router)


}