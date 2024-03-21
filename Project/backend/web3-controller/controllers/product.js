const { contracts, logger } = require('../utils');
const { ProductAction } = contracts;

exports.addProduct = async (req, res, next) => {
    const {productName, productStatus} = req.body;

    try {
        const address = await ProductAction.methods.owner().call();
    
        ProductAction.methods.registerProduct(productName, productStatus).send({from: address, gas:1000000});
    
        const productEvent = await new Promise((resolve) => {
            ProductAction.events.ProductCreated()
                .once("data", (event) => resolve(event))
        });

        if(productEvent.returnValues.productName !== productName || productEvent.returnValues.productStatus !== productStatus) {
            throw ((message, status) => {
                const error = new Error(message);
                error.status = status;
                return error;
            })("There is an internal error", 500);
        }
        const { productId } = productEvent.returnValues;
    
        logger.info(`New product added with ID: ${productId}`);
    
        return res.status(201)
        .json({ 
            message:'Product added successfully',
            productId: productId 
        })
    } 
    catch (error) {
        if(error.status) {
            return res.status(error.status)
            .json({
                message: error.message
            });
        }
        else {
            return res.status(503)
            .json({
                message: error.message
            });
        }
    }
}

exports.findProduct = async (req, res, next) => {
    const { productId } = req.params;

    try {
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
    catch (error) {
        if(error.status) {
            return res.status(error.status)
            .json({
                message: error.message
            });
        }
        else {
            return res.status(503)
            .json({
                message: error.message
            });
        }
    }
}

// Status can also be stored in transactions
exports.updateProductStatus = async (req, res, next) => {
    const { productId } = req.params;
    const { productStatus } = req.body;

    try {
        const address = await ProductAction.methods.owner().call();
    
        ProductAction.methods.addProductDetails(productId, productStatus).send({from: address, gas:1000000});
    
        const productEvent = await new Promise((resolve) => {
            ProductAction.events.ProductDetailsUpdated()
            .once('data', (event) => resolve(event));
        });
    
        logger.info(`Product Found with ID: ${productEvent.returnValues.productId}, with details: ${productEvent.returnValues.productStatus}`);
    
        return res.status(200)
        .json({
            message: "Status Successfully Updated!",
            productId: productEvent.returnValues.productId,
            newStatus: productEvent.returnValues.productStatus
        })
    } 
    catch (error) {
        if(error.status) {
            return res.status(error.status)
            .json({
                message: error.message
            });
        }
        else {
            return res.status(503)
            .json({
                message: error.message
            });
        }
    }
}