const { contracts } = require("./contract-init");
const { Controller } = contracts

//Transaction fee must be considered
let owner;
Controller.methods.owner().call()
.then((address) => {
    owner = address;
    setOwners();
}).catch((err) => {
    console.error(err);
});

//Add Product
Controller.events.ProductAddition((error, event) => {
  if (error) {
      console.error('Error:', error);
  } else {
      console.log('Event:', event.event); 
      console.log('Data:', event.returnValues);
  }
})
.on("data", async (event) => {
    await contracts.ProductAction.methods.registerProduct(event.returnValues.productName, event.returnValues.productStatus).send({from: owner, gas: 1000000})
    .on('receipt', (receipt) => {
        console.log("Event Logs:", receipt.logs);
        const productId = receipt.events.ProductRegistered.returnValues.productId;
        console.log("Product ID:", productId);
    })
});

//Edit Product
Controller.events.ProductEdit((error, event) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Event:', event.event); 
        console.log('Data:', event.returnValues);
    }
})
.on("data", async (event) => {
    await contracts.ProductAction.methods.updateProduct(event.returnValues).send({from: Controller});
});

//Add Supplier
Controller.events.SupplierAddition((error, event) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Event:', event.event); 
        console.log('Data:', event.returnValues);
    }
})
.on("data", async (event) => {
    await contracts.SupplyChain.methods.addSupplier(event.returnValues).send({from: Controller});
});

//Record Transaction
Controller.events.TransactionRecord((error, event) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Event:', event.event); 
        console.log('Data:', event.returnValues);
    }
})
.on("data", async (event) => {
    await contracts.SupplyChain.methods.recordTransaction(event.returnValues).send({from: Controller});
})

//Find Product 
Controller.events.ProductSearch((error, event) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Event:', event.event); 
        console.log('Data:', event.returnValues);
    }
})
.on("data", async (event) => {
    await contracts.ProductAction.methods.findProduct(event.returnValues).send({from: Controller});
});

//Update Details
Controller.events.DetailsUpdate((error, event) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Event:', event.event); 
        console.log('Data:', event.returnValues);
    }
})
.on("data", async (event) => {
    await contracts.ProductAction.methods.addProductDetails(event.returnValues).send({from: Controller});
});

const setOwners = async () => {
    await contracts.ProductAction.methods.setOwner(owner).send({from: owner});
    await contracts.SupplyChain.methods.setOwner(owner).send({from: owner});
}