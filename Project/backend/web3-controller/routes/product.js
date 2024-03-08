const Router = require('express').Router();

Router.post('/product');  // 添加商品 addProduct

Router.put('/product'); //editProduct

Router.patch('/product'); // editProductStatus

Router.get('/product/:productId'); //getProductDetails

module.exports = Router;