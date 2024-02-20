const path = require("path");
const fs = require("fs");
const solc = require("solc");

const controllerPath = path.resolve(__dirname,"..\\..\\..\\", "contracts", "*.sol");
const source = fs.readFileSync(controllerPath, "utf8");

module.exports = solc.compile(source, 1).contracts[":Controller"];
