module.exports = {
  networks: {
    development: {
      host: "ganache-cli",
      port: 8545,
      network_id: "*" // Match any network id
    }
  }
};