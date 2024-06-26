const { contracts, logger } = require("../utils")
const { ProductAction } = contracts

const axios = require("axios")

exports.addProduct = async (req, res, next) => {
  const { productName } = req.body

  try {
    const address = await ProductAction.methods.owner().call()
    const date = new Date()

    ProductAction.methods
      .registerProduct(productName, date.toISOString())
      .send({ from: address, gas: 6721975 })

    const productEvent = await new Promise((resolve) => {
      ProductAction.events
        .ProductCreated()
        .once("data", (event) => resolve(event))
    })

    if (productEvent.returnValues.productName !== productName) {
      throw ((message, status) => {
        const error = new Error(message)
        error.status = status
        return error
      })("There is an internal error", 500)
    }
    const { productId } = productEvent.returnValues

    const response = await axios.post("http://localhost:3002/qr", {
      productId: productId,
      productName: productName,
    })

    if (response.status === 500) {
      throw ((message, status) => {
        const error = new Error(message)
        error.status = status
        return error
      })("There is an internal error", 500)
    }

    logger.info(`New product added with ID: ${productId}`)

    return res.status(201).json({
      message: "Product added successfully",
      productId: productId,
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

exports.findProduct = async (req, res, next) => {
  const { productId } = req.params

  try {
    const address = await ProductAction.methods.owner().call()

    ProductAction.methods
      .findProduct(productId)
      .send({ from: address, gas: 1000000 })

    const productEvent = await new Promise((resolve) => {
      ProductAction.events
        .ProductAccessed()
        .once("data", (event) => resolve(event))
    })

    const product = {
      productId: productEvent.returnValues.product.productId.toString(),
      name: productEvent.returnValues.product.productName,
      timestamp: new Date().toISOString(),
    }
    logger.info(
      `Product Found with ID: ${product.productId}, name: ${product.name}`
    )

    return res.status(200).json({
      message: "Product found!",
      product: product,
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

exports.getProducts = async (req, res, next) => {
  try {
    const address = await ProductAction.methods.owner().call()
    ProductAction.methods.getAllProducts().send({ from: address, gas: 1000000 })

    const productEvent = await new Promise((resolve) => {
      ProductAction.events
        .ProductsReturned()
        .once("data", (event) => resolve(event))
    })
    const { products } = productEvent.returnValues
    logger.info("All products returned")

    return res.status(200).json({
      products: products,
    })
  } catch (error) {
    return res.status(503).json({
      message: error.message,
    })
  }
}
