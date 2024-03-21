const Router = require('express').Router();

const productController = require('../controllers/product');

Router.post('/product', productController.addProduct);

Router.patch('/product/:productId', productController.updateProductStatus);

Router.get('/product/:productId', productController.findProduct); 

module.exports = Router;