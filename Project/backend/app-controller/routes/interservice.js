const Router = require("express").Router()

const interserviceController = require("../controllers/interservice")

Router.post("/match/address", interserviceController.matchAddress)

Router.post("/match/companies", interserviceController.matchCompanyNames)

module.exports = Router
