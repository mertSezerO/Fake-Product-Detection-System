const { contracts, logger } = require('../utils');
const { SupplyChain } = contracts;

exports.getProductTransactions = async (req, res, next) => {
    const { productId } = req.params;
    const address = await ProductAction.methods.owner().call();

    SupplyChain.methods.getProductHistory(productId).send({from: address, gas: 1000000});

    const supplyEvent = await new Promise((resolve) => {
        SupplyChain.events.ProductTransactionAccessed()
        .once('data', (event) => resolve(event));
    });
    const { transactions } = supplyEvent.returnValues;

    logger.info(`Transactions of Product with ID: ${productId}, transactions:${transactions}`);

    return res.status(200)
    .json({
        message: "Transactions of product successfully retrieved.",
        productId: productId,
        transactions: transactions
    });
}

exports.createTransaction = async (req, res, next) => {
    const { productId, receiver } = req.body;
    const address = await ProductAction.methods.owner().call();

    SupplyChain.methods.recordTransaction(productId, receiver).send({from: address, gas: 1000000});

    const supplyEvent = await new Promise((resolve) => {
        SupplyChain.events.TransactionCreated()
        .once('data', (event) => resolve(event));
    });
    const { sender } = supplyEvent.returnValues;

    logger.info(`New transaction for product with ID: ${productId}, transaction: ${JSON.stringify({receiver: receiver, sender: sender})}`);
    
    return res.status(200)
    .json({
        message: "Transaction created.",
        productId: productId,
        sender: sender,
        receiver: receiver
    })
}

exports.addNewSupplier = async (req, res, next) => {
    const { supplier } = req.body;
    const address = await ProductAction.methods.owner().call();

    SupplyChain.methods.addSupplier(supplier).send({ from: address, gas: 1000000 });

    const supplyEvent = await new Promise((resolve) => {
        SupplyChain.events.SupplierAdded()
        .once('data', (event) => resolve(event));
    });

    logger.info(`New supplier added with address: ${supplier}`);

    return res.status(200)
    .json({
        message: "Supplier successfully added.",
        supplier: supplier
    })
}