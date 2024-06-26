const jwt_decode = require("jwt-decode")

require("dotenv").config()

const cache = {}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

exports.deduplicate = async (req, res, next) => {
  const { productId } = req.params
  const value = `${productId}`
  if (cache[value] && Date.now() - cache[value] < process.env.TIME_FRAME) {
    await sleep(1000)
    console.log("Duplicate request for " + productId)
    return res.status(400).json("Duplicate Request")
  } else {
    cache[value] = Date.now()
    next()
  }
}

exports.decodeToken = (req, res, next) => {
  const token = req.get("Authorization").split(" ")[1]
  try {
    const decodedToken = jwt_decode(token)
    req.token = decodedToken
    next()
  } catch (err) {
    console.log("Token is invalid.")
  }
}
