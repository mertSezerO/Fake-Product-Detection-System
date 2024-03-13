require('./scripts/event-handler');

module.exports = {
    wsProvider: require("./scripts/contract-init").wsProvider,
    ganacheWeb3: require("./scripts/contract-init").ganacheWeb3,
    contracts: require("./scripts/contract-init").contracts,
    logger: require('./scripts/log-config'),
}