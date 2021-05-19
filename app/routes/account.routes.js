module.exports = app => {
    const tcontroller = require("../controllers/account.controller.js")
    var router = require("express").Router();

    router.post("/",tcontroller.createAccount)
    router.get("/",tcontroller.findAll)
    router.get("/:id",tcontroller.findAllbyID)
    router.get("/username/:username",tcontroller.findbyUsername)
    router.get("/IC_Number/:IC_Number",tcontroller.findByIC)
    router.delete("/:id",tcontroller.delete)
    router.delete("/", tcontroller.deleteAll)
    router.post("/login", tcontroller.loginFunction)
    router.put("/id/:id",tcontroller.update)

    app.use('/api/account',router)

}