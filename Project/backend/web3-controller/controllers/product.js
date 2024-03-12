const { contracts } = require('../utils');

exports.addProduct = async (req, res, next) => {
    const {productName, productStatus} = req.body;
    const address = await contracts.Controller.methods.owner().call();
    contracts.Controller.methods.addProduct(productName, productStatus).send({from: address});
    return res.status(201).json({message:'Product added successfully'})
}