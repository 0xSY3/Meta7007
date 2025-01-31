import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "@primitivefi/hardhat-dodoc";
import "@nomiclabs/hardhat-waffle";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    hardhat: {
      chainId: 1337,
      allowUnlimitedContractSize: true,
      mining: {
        auto: true,
        interval: [1000, 3000],
        mempool: {
          order: "fifo"
        }
      },
      accounts: {
        mnemonic: "test test test test test test test test test test test junk",
        path: "m/44'/60'/0'/0",
        count: 20
      }
    }
  },
  dodoc: {
    runOnCompile: true,
    debugMode: false,
    outputDir: "docs",
    include: ["contracts"],
    keepFileStructure: true,
    freshOutput: true
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test"
  },
  mocha: {
    timeout: 40000
  }
};

export default config;