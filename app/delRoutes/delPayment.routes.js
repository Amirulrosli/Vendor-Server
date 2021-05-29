module.exports = app => {
    const tcontroller = require("../delcontrollers/delPayment.controller.js")
    var router = require("express").Router();

    router.post("/", tcontroller.create);
    router.get("/",tcontroller.findAll)
    router.get("/overdue", tcontroller.findAllsend)
    router.get("/:id",tcontroller.findOne)
    router.put("/:id",tcontroller.update)
    router.delete("/:id",tcontroller.delete)
    router.delete("/", tcontroller.deleteAll)
    router.get("/rid/:rid",tcontroller.findAllbyRID)
    router.get("/deliver/deliver",tcontroller.findAllNotDelivered)
    router.get("/sent/sent",tcontroller.findAllsend)
    
    
    app.use('/api/delpayments', router)


}