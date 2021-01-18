module.exports = app => {
    const tcontroller = require("../controllers/tutorial.controller.js")
    var router = require("express").Router();

    router.post("/", tcontroller.create);
    router.get("/",tcontroller.findAll)
    router.get("/overdue", tcontroller.findAlloverdue)
    router.get("/:id",tcontroller.findOne)
    router.put("/:id",tcontroller.update)
    router.delete("/:id",tcontroller.delete)
    router.delete("/", tcontroller.deleteAll)
    
    app.use('/api/profiles', router)


}