const { contracts } = require('../utils');
const { ProductAction, SupplyChain } = contracts;

exports.addProduct = async (req, res, next) => {
    const {productName, productStatus} = req.body;
    const address = await ProductAction.methods.owner().call();
    ProductAction.methods.registerProduct(productName, productStatus).send({from: address, gas:1000000});
    return res.status(201).json({ message:'Product added successfully' })
}

exports.findProduct = async (req, res, next) => {
    const { productId } = req.params;
    const address = await ProductAction.methods.owner().call();
    ProductAction.methods.findProduct(productId).send({from: address, gas:1000000});
    return res.status(200).json({ message: 'Product found!'});
}