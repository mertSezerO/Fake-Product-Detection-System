const { contracts } = require("./contract-init");
const { controller } = contracts

//Transaction fee must be considered

//Add Product
controller.events.ProductAddition((error, event) => {
  if (error) {
      console.error('Error:', error);
  } else {
      console.log('Event:', event.event); 
      console.log('Data:', event.returnValues);
  }
})
.on("data", async (event) => {
    //check parameter if there is an error
  await contracts.ProductAction.methods.registerProduct(event.returnValues).send({from: controller});
});

//Edit Product
controller.events.ProductEdit((error, event) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Event:', event.event); 
        console.log('Data:', event.returnValues);
    }
})
.on("data", async (event) => {
    await contracts.ProductAction.methods.updateProduct(event.returnValues).send({from: controller});
});

//Add Supplier
controller.events.SupplierAddition((error, event) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Event:', event.event); 
        console.log('Data:', event.returnValues);
    }
})
.on("data", async (event) => {
    await contracts.SupplyChain.methods.addSupplier(event.returnValues).send({from: controller});
});

//Record Transaction
controller.events.TransactionRecord((error, event) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Event:', event.event); 
        console.log('Data:', event.returnValues);
    }
})
.on("data", async (event) => {
    await contracts.SupplyChain.methods.recordTransaction(event.returnValues).send({from: controller});
})

//Find Product 
controller.events.ProductSearch((error, event) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Event:', event.event); 
        console.log('Data:', event.returnValues);
    }
})
.on("data", async (event) => {
    await contracts.ProductAction.methods.findProduct(event.returnValues).send({from: controller});
});

//Update Details
controller.events.DetailsUpdate((error, event) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Event:', event.event); 
        console.log('Data:', event.returnValues);
    }
})
.on("data", async (event) => {
    await contracts.ProductAction.methods.addProductDetails(event.returnValues).send({from: controller});
});

const setOwners = async () => {
    await contracts.ProductAction.methods.setOwner(controller.owner).send({from: controller.owner});
    await contracts.SupplyChain.methods.setOwner(controller.owner).send({from: controller.owner});
}

setOwners();