const Router = require('express').Router();

const supplyChainController = require('../controllers/supply-chain');

Router.get('/supply-chain/:productId', supplyChainController.getProductTransactions);

Router.post('/supply-chain', supplyChainController.createTransaction);

Router.put('/supply-chain', supplyChainController.addNewSupplier);

module.exports = Router;