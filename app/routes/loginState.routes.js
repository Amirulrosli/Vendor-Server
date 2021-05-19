module.exports = app => {
    const tcontroller = require("../controllers/loginState.controller.js")
    var router = require("express").Router();

    router.post("/", tcontroller.create);
    router.get("/",tcontroller.findAll)
    router.get("/:id",tcontroller.findOne)
    router.put("/update/:id",tcontroller.update)
    router.delete("/:id",tcontroller.delete)
    router.delete("/", tcontroller.deleteAll)
    router.delete("/rid/:rid", tcontroller.deleteByRid)
    router.get("/rid/:rid",tcontroller.findAllbyRID)

    
    app.use('/api/loginState', router)


}