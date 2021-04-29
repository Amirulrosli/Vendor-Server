module.exports = app => {
    const tcontroller = require("../controllers/account.controller.js")
    var router = require("express").Router();

    router.post("/",tcontroller.createAccount)
    router.get("/",tcontroller.findAll)
    router.get("/:rid",tcontroller.findAllbyRID)
    router.delete("/:id",tcontroller.delete)
    router.delete("/", tcontroller.deleteAll)
    router.post("/login", tcontroller.loginFunction)
    router.put("/:id",tcontroller.update)

    app.use('/api/account',router)

}