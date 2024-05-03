const Router = require("express").Router()

const interserviceController = require("../controllers/interservice")

Router.get("/address", interserviceController.assignAddress)

module.exports = Router
