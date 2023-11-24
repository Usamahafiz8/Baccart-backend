const ethers = require('ethers');
require('dotenv').config();
const infuraApiKey = process.env.Infura_Private_Key;

class MaticTransferController {
  constructor(privateKey, recipientAddress, amountToSend) {
    // Initialize class properties with constructor parameters
    this.privateKey = privateKey;
    this.recipientAddress = recipientAddress;
    this.amountToSend = ethers.utils.parseUnits(amountToSend.toString(), 'ether'); // Convert to BigNumber

    // Infura settings for Polygon (Matic) network
    this.infuraUrl = `https://polygon-mainnet.infura.io/v3/${infuraApiKey}`;

    // Create the wallet
    this.provider = new ethers.providers.JsonRpcProvider(this.infuraUrl);
    this.wallet = new ethers.Wallet(privateKey, this.provider);
  }

  async checkMaticBalance() {
    try {
      const maticBalance = await this.wallet.getBalance();
      console.log("MATIC Balance:", ethers.utils.formatUnits(maticBalance, 'ether'));
    } catch (error) {
      console.error("Error checking MATIC balance:", error.message);
    }
  }

  async transferMatic(req, res) {
    try {
      // Check the MATIC balance before initiating the transfer
      await this.checkMaticBalance();
  
      // Get the current nonce and gas prices
      const nonce = await this.wallet.getTransactionCount();
      const gasPrices = await this.wallet.getGasPrice();
  
      console.log("Gas Prices (Wei):", gasPrices.toString());
  
      // Adjust the gas price calculation dynamically (increase by 10%)
      const gasPrice = gasPrices.add(gasPrices.div(1)); // Adjust as needed
      const gasLimit = 40000; // Experiment with different values
      
  
      console.log("Adjusted Gas Price:", gasPrice.toString());
  
      // Check the MATIC balance to cover gas fees and the amount to send
      const maticBalance = await this.wallet.getBalance();
      const totalGasFeesWei = gasPrice.mul(21000);
  
      console.log("Total Gas Fees (Wei):", totalGasFeesWei.toString());
  
      if (maticBalance.lt(totalGasFeesWei.add(this.amountToSend))) {
        throw new Error("Insufficient MATIC funds for the transaction. Please add MATIC to cover gas fees.");
      }
  
      console.log("Sender MATIC Balance:", ethers.utils.formatUnits(maticBalance, 'ether'));
      console.log("Recipient Address:", this.recipientAddress);
      console.log("Transfer Amount:", ethers.utils.formatUnits(this.amountToSend, 'ether'));
  
      // Initiate the MATIC transfer
      const tx = await this.wallet.sendTransaction({
        to: this.recipientAddress,
        value: this.amountToSend,
        gasPrice: gasPrice,
        nonce: nonce,
        gasLimit: gasLimit, 
      });
      
      // Wait for the transaction to be mined
      await tx.wait();
      console.log("Transaction Hash:", tx.hash);
  
      // Check the MATIC balance after the transfer
      await this.checkMaticBalance();
  
      // Respond with success message and transaction hash
      res.json({ success: true, message: 'MATIC transferred successfully.', TransactionHash: `${tx.hash}` });
    } catch (error) {
      console.error("Error transferring MATIC:", error.message);
      // Respond with an error status and message
      res.status(500).json({ success: false, message: 'Error transferring MATIC.', error: error.message });
    }
  }
}

module.exports = MaticTransferController;
