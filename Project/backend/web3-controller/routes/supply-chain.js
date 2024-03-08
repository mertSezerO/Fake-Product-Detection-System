const Router = require('express').Router();

Router.post('/supply-chain');  // 添加商品 createTransaction

Router.patch('/supply-chain'); //addSupplier

Router.get('/supply-chain/:productId') //getProductHistory

module.exports = Router;