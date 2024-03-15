const { contracts } = require("./contract-init");
const { ProductAction, SupplyChain } = contracts;

const logger = require('./log-config');
//Transaction fee must be considered

//Edit Product
ProductAction.events.ProductUpdated((error, event) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Event:', event.event); 
        console.log('Data:', event.returnValues);
    }
})
.on("data", (event) => {
    logger.info(`Product with ID ${event.returnValues} Updated with: ${JSON.stringify(event.returnValues)}`);
});

ProductAction.events.ProductDetailsUpdated((error, event) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Event:', event.event); 
        console.log('Data:', event.returnValues);
    }
})
.on("data", (event) => {
    logger.info(`Product Found with ID: ${event.returnValues.product.productId}, with details: ${event.returnValues.product}`);
});

//Add Supplier
SupplyChain.events.ProductTransactionAccessed((error, event) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Event:', event.event); 
        console.log('Data:', event.returnValues);
    }
})
.on("data", (event) => {
    logger.info(`Transactions of Product with ID: ${event.returnValues.transaction.productId}, transactions:${event.returnValues.transaction}`);
    //kafka channel
});

//Record Transaction
SupplyChain.events.TransactionCreated((error, event) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Event:', event.event); 
        console.log('Data:', event.returnValues);
    }
})
.on("data",  (event) => {
    logger.info(`New transaction for product with ID: ${event.returnValues.productId}, transaction: ${JSON.stringify({
        receiver: event.returnValues.receiver,
        sender: event.returnValues.sender
    })}`);
})

//Find Product 
SupplyChain.events.SupplierAdded((error, event) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Event:', event.event); 
        console.log('Data:', event.returnValues);
    }
})
.on("data", (event) => {
    logger.info(`New supplier added: ${event.returnValues.supplier}`);
});