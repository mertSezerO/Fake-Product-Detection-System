const { contracts, logger } = require('../utils');
const { ProductAction, SupplyChain } = contracts;

exports.addProduct = async (req, res, next) => {
    const {productName, productStatus} = req.body;
    const address = await ProductAction.methods.owner().call();

    ProductAction.methods.registerProduct(productName, productStatus).send({from: address, gas:1000000});

    const productEvent = await new Promise((resolve) => {
        ProductAction.events.ProductCreated()
            .once("data", (event) => resolve(event))
    });

    logger.info(`New product added with ID: ${productEvent.returnValues.productId}`);

    return res.status(201)
    .json({ 
        message:'Product added successfully',
        productId: productEvent.returnValues.productId 
    })
}

exports.findProduct = async (req, res, next) => {
    const { productId } = req.params;
    const address = await ProductAction.methods.owner().call();

    ProductAction.methods.findProduct(productId).send({from: address, gas:1000000});

    const productEvent = await new Promise((resolve) => {
        ProductAction.events.ProductAccessed()
        .once('data', (event) => resolve(event));
    });
    const product = {
        productId: productEvent.returnValues.product.productId.toString(),
        name: productEvent.returnValues.product.productName,
        status:  productEvent.returnValues.product.productStatus,
        timestamp: productEvent.returnValues.product.timestamp.toString(),
    }
    logger.info(`Product Found with ID: ${product.productId}, name: ${product.productName}, status: ${product.productStatus}, timestamp: ${product.timestamp}`);

    return res.status(200)
    .json({ 
        message: 'Product found!',
        product: product
    });
}