const ethers = require("ethers");
require("dotenv").config();
const infuraApiKey = process.env.Infura_Private_Key;
const usdtABI = require("../../contractAbi/USDT.json");
const USDTAddress = process.env.USDT_CONTRACT_ADDRESS;

class USDTTransferController {
  constructor(privateKey, recipientAddress, amountToSend) {
    this.privateKey = privateKey;
    this.recipientAddress = recipientAddress;
    this.amountToSend = ethers.utils.parseUnits("0.001", 6); // 6 is the number of decimals for USDT


    this.infuraUrl = `https://polygon-mainnet.infura.io/v3/${infuraApiKey}`;
    this.provider = new ethers.providers.JsonRpcProvider(this.infuraUrl);
    this.wallet = new ethers.Wallet(privateKey, this.provider);
    this.tokenContract = new ethers.Contract(USDTAddress, usdtABI, this.wallet);
  }

  async checkBalance() {
    try {
      const balance = await this.tokenContract.balanceOf(this.wallet.address);
      console.log(
        "USDT Token Balance:",
        ethers.utils.formatUnits(balance, "wei")
      );
    } catch (error) {
      console.error("Error checking balance:", error.message);
    }
  }
  async transferTokensAPI(req, res) {
    try {
      const nonce = await this.wallet.getTransactionCount();
      const gasPrices = await this.wallet.getGasPrice();
  
      console.log("Gas Prices (Wei):", gasPrices.toString());
  
      // Adjust the gas price calculation dynamically (increase by 10%)
      const gasPrice = gasPrices.add(gasPrices.div(10));
  
      console.log("Adjusted Gas Price:", gasPrice.toString());
  
      const usdtBalance = await this.tokenContract.balanceOf(
        this.wallet.address
      );
      if (usdtBalance.lt(this.amountToSend)) {
        throw new Error(
          "Insufficient USDT funds for the transaction. Please add more USDT tokens."
        );
      }
  
      const usdtInterface = new ethers.utils.Interface(usdtABI);
      const transferData = usdtInterface.encodeFunctionData('transfer', [this.recipientAddress, this.amountToSend]);
  
      const tx = await this.wallet.sendTransaction({
        to: USDTAddress,
        data: transferData,
        gasPrice: gasPrice,
        nonce: nonce,
      });
  
      await tx.wait();
      console.log("Transaction Hash:", tx.hash);
  
      await this.checkBalance();
  
      res.json({
        success: true,
        message: "Tokens transferred successfully.",
        TransactionHash: `${tx.hash}`,
      });
    } catch (error) {
      console.error("Error transferring USDT tokens:", error.message);
      res
        .status(500)
        .json({
          success: false,
          message: "Error transferring tokens.",
          error: error.message,
        });
    }
  }
  
  
}

module.exports = USDTTransferController;
