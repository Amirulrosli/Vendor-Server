module.exports = app => {
    const tcontroller = require("../controllers/tutorial.controller.js")
    var router = require("express").Router();

    router.post("/", tcontroller.create);
    router.get("/",tcontroller.findAll)
    router.get("/overdue", tcontroller.findAlloverdue)
    router.get("/paid", tcontroller.findAllPaid)
    router.get("/:id",tcontroller.findOne)
    router.put("/update/:id",tcontroller.update)
    router.delete("/:id",tcontroller.delete)
    router.delete("/", tcontroller.deleteAll)
    router.get("/IC/:IC_Number", tcontroller.findAllbyIC)
    router.get("/rid/:rid",tcontroller.findAllbyRID)
    router.post("/send",tcontroller.sendMailing)

    app.use('/api/profiles', router)


}