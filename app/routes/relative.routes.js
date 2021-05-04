module.exports = app => {
    const tcontroller = require("../controllers/relative.controller.js")
    var router = require("express").Router();

    router.post("/",tcontroller.createRelative)
    router.get("/",tcontroller.findAll)
    router.get("/:rid",tcontroller.findAllbyRID)
    router.delete("/:id",tcontroller.delete)
    router.delete("/", tcontroller.deleteAll)
    router.put("/:id",tcontroller.update)

    app.use('/api/relative',router)

}