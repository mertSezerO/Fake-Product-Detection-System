const Router = require("express").Router()

const interserviceController = require("../controllers/interservice")

Router.post("/match", interserviceController.matchAddress)

module.exports = Router
