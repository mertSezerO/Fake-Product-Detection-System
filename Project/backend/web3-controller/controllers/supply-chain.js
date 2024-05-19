const axios = require("axios")
const { contracts, logger } = require("../utils")
const { SupplyChain } = contracts

exports.getProductTransactions = async (req, res, next) => {
  const { productId } = req.params

  try {
    const address = await SupplyChain.methods.owner().call()

    SupplyChain.methods
      .getProductHistory(productId)
      .send({ from: address, gas: 1000000 })

    const supplyEvent = await new Promise((resolve) => {
      SupplyChain.events
        .ProductTransactionAccessed()
        .once("data", (event) => resolve(event))
    })

    if (supplyEvent.returnValues.productId !== productId) {
      throw ((message, status) => {
        const error = new Error(message)
        error.status = status
        return error
      })("There is an internal error", 500)
    }
    let { transactions } = supplyEvent.returnValues
    transactions = transactions.map((transaction) => ({
      sender: transaction.sender,
      receiver: transaction.receiver,
      productStatus: transaction.productStatus,
      transactionDate: transaction.transactionDate,
    }))

    const response = await axios.get("http://localhost:3001/match/companies", {
      transactions: transactions,
    })

    transactions = response.data.transactions

    logger.info(
      `Transactions of Product with ID: ${productId}, transactions:${transactions}`
    )

    return res.status(200).json({
      message: "Transactions of product successfully retrieved.",
      productId: productId,
      transactions: transactions,
    })
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({
        message: error.message,
      })
    } else {
      return res.status(503).json({
        message: error.message,
      })
    }
  }
}

exports.createTransaction = async (req, res, next) => {
  const { productId } = req.params
  const { companyName, condition } = req.body

  try {
    const address = await SupplyChain.methods.owner().call()

    console.log(companyName)
    const response = await axios.post("http://localhost:3001/match/address", {
      companyName: companyName,
    })

    const receiver = response.data.address
    const date = new Date()

    SupplyChain.methods
      .recordTransaction(
        productId,
        response.data.address,
        condition,
        date.toISOString()
      )
      .send({ from: address, gas: 1000000 })

    const supplyEvent = await new Promise((resolve) => {
      SupplyChain.events
        .TransactionCreated()
        .once("data", (event) => resolve(event))
    })

    if (
      supplyEvent.returnValues.receiver !== receiver ||
      supplyEvent.returnValues.productId !== productId ||
      supplyEvent.returnValues.condition !== condition
    ) {
      throw ((message, status) => {
        const error = new Error(message)
        error.status = status
        return error
      })("There is an internal error", 500)
    }
    const { sender } = supplyEvent.returnValues

    logger.info(
      `New transaction for product with ID: ${productId}, transaction: ${JSON.stringify(
        { sender: sender, receiver: receiver, condition: condition }
      )}`
    )

    return res.status(201).json({
      message: "Transaction created.",
      transaction: {
        productId: productId,
        sender: sender,
        receiver: receiver,
        condition: condition,
      },
    })
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({
        message: error.message,
      })
    } else {
      return res.status(503).json({
        message: error.message,
      })
    }
  }
}

exports.addNewSupplier = async (req, res, next) => {
  const { supplier } = req.body

  try {
    const address = await SupplyChain.methods.owner().call()
    SupplyChain.methods
      .addSupplier(supplier)
      .send({ from: address, gas: 1000000 })

    const supplyEvent = await new Promise((resolve) => {
      SupplyChain.events.SupplierAdded().once("data", (event) => resolve(event))
    })

    if (supplyEvent.returnValues.supplier !== supplier) {
      throw ((message, status) => {
        const error = new Error(message)
        error.status = status
        return error
      })("There is an internal error", 500)
    }

    logger.info(`New supplier added with address: ${supplier}`)

    return res.status(200).json({
      message: "Supplier successfully added.",
      supplier: supplier,
    })
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({
        message: error.message,
      })
    } else {
      return res.status(503).json({
        message: error.message,
      })
    }
  }
}
