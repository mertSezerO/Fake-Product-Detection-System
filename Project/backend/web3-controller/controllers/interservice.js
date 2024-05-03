const { ganacheWeb3 } = require("../utils")

const fs = require("fs")

function saveIndexToFile(index) {
  fs.writeFileSync("index.txt", index.toString())
}

function loadIndexFromFile() {
  try {
    return parseInt(fs.readFileSync("index.txt", "utf8"))
  } catch (err) {
    return 1
  }
}

let index = loadIndexFromFile()

exports.assignAddress = async (req, res, next) => {
  const addresses = await ganacheWeb3.eth.getAccounts()
  saveIndexToFile(index + 1)
  return res.status(200).json({
    address: addresses[index++],
  })
}
