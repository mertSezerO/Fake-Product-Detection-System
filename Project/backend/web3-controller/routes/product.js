const Router = require('express').Router();

const productController = require('../controllers/product');

Router.post('/product', productController.addProduct);  // 添加商品 addProduct

Router.put('/product/:productId'); //editProduct

Router.patch('/product/:productId'); // editProductStatus

Router.get('/product/:productId'); //getProductDetails

module.exports = Router;