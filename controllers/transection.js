const ethers = require("ethers");

class TokenTransferController {
  constructor(privateKey, recipientAddress, amountToSend, tokenAddress, infuraApiKey) {
    this.privateKey = privateKey;
    this.recipientAddress = recipientAddress;
    this.amountToSend = amountToSend;
    this.tokenAddress = tokenAddress;
    this.infuraApiKey = infuraApiKey;

    this.infuraUrl = `https://polygon-mainnet.infura.io/v3/${infuraApiKey}`;
    this.provider = new ethers.providers.JsonRpcProvider(this.infuraUrl);
    this.wallet = new ethers.Wallet(privateKey, this.provider);
    this.tokenContract = new ethers.Contract(tokenAddress, require("./CCC.json"), this.wallet);
  }

  async checkBalance() {
    try {
      const balance = await this.tokenContract.balanceOf(this.wallet.address);
      console.log("CCC Token Balance:", balance.toString() / 100000000);
    } catch (error) {
      console.error("Error checking balance:", error.message);
    }
  }

  async checkMaticBalance() {
    try {
      const maticBalance = await this.wallet.getBalance();
      console.log("MATIC Balance:", ethers.utils.formatUnits(maticBalance, 'ether'));
    } catch (error) {
      console.error("Error checking MATIC balance:", error.message);
    }
  }

  async getGasPrices() {
    try {
      const gasPrices = await this.wallet.getGasPrice();

      console.log("Current Gas Prices (in Gwei):");
      console.log("Lowest Gas Price:", ethers.utils.formatUnits(gasPrices.div(2), 'gwei'));
      console.log("Highest Gas Price:", ethers.utils.formatUnits(gasPrices.mul(2), 'gwei'));
    } catch (error) {
      console.error("Error fetching gas prices:", error.message);
    }
  }

  async transferTokens() {
    try {
      await this.checkMaticBalance();

      const nonce = await this.wallet.getTransactionCount();
      const gasPrices = await this.wallet.getGasPrice();
      const gasPrice = ethers.utils.parseUnits(gasPrices.div(99999999).toString(), 'gwei');

      const maticBalance = await this.wallet.getBalance();

      const totalGasFeesWei = gasPrice.mul(21000);

      if (maticBalance.lt(totalGasFeesWei.add(this.amountToSend))) {
        throw new Error("Insufficient MATIC funds for the transaction. Please add MATIC to cover gas fees.");
      }

      const tx = await this.tokenContract.transfer(this.recipientAddress, this.amountToSend, {
        gasPrice: gasPrice,
        nonce: nonce,
      });

      await tx.wait();
      console.log("Transaction Hash:", tx.hash);

      await this.checkBalance();
    } catch (error) {
      console.error("Error transferring CCC tokens:", error.message);
    }
  }
}

// Example usage:
const infuraApiKey = "f09fc916f9a046a8a62d9e2d00229b55";
const privateKey = "YOUR_PRIVATE_KEY";
const recipientAddress = "0xcadb05693aad671bb2187e12316daa22573ecf7e";
const amountToSend = "100000000"; // 0.1 CCC
const tokenAddress = "0x0c39c858f0F83c6DfFe5567828eAf85A060dd140";

const tokenController = new TokenTransferController(privateKey, recipientAddress, amountToSend, tokenAddress, infuraApiKey);
tokenController.checkBalance();
tokenController.checkMaticBalance();
tokenController.getGasPrices();
tokenController.transferTokens();
