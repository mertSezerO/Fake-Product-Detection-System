const Router = require('express').Router();

const productController = require('../controllers/product');

Router.post('/product', productController.addProduct);

// Router.put('/product/:productId', productController.updateProduct);

Router.patch('/product/:productId', productController.updateProductStatus);

Router.get('/product/:productId', productController.findProduct); 

module.exports = Router;