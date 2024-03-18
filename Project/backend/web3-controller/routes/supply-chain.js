const Router = require('express').Router();

const supplyChainController = require('../controllers/supply-chain');

Router.get('/supply-chain/:productId', supplyChainController.getProductTransactions);

Router.post('/supply-chain/:productId', supplyChainController.createTransaction);

Router.post('/supply-chain', supplyChainController.addNewSupplier);

module.exports = Router;