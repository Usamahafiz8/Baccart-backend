const express = require('express');
const { ethers } = require('ethers');

const router = express.Router();

// Replace these with your own values
const privateKeySender = 'YOUR_SENDER_PRIVATE_KEY';
const privateKeyReceiver = 'YOUR_RECEIVER_PRIVATE_KEY';
const maticRPC = 'https://rpc-mumbai.maticvigil.com'; // Use the correct Matic RPC for your network

// Connect to the Matic network
const provider = new ethers.providers.JsonRpcProvider(maticRPC);
const walletSender = new ethers.Wallet(privateKeySender, provider);
const walletReceiver = new ethers.Wallet(privateKeyReceiver, provider);

// ERC20 token contract address and ABI
const tokenAddress = 'YOUR_ERC20_TOKEN_ADDRESS';
const tokenABI = ['function transfer(address to, uint256 amount) returns (bool)'];

const tokenContract = new ethers.Contract(tokenAddress, tokenABI, walletSender);

// Express route for transferring Matic
router.post('/transfer', async (req, res) => {
  try {
    const { to, amount } = req.body;

    // Convert amount to wei if not already in wei
    const amountInWei = ethers.utils.parseUnits(amount.toString(), 'ether');

    // Call the transfer function of the ERC20 token contract
    const transaction = await tokenContract.transfer(to, amountInWei);

    // Wait for the transaction to be mined
    await transaction.wait();

    res.status(200).json({ success: true, transactionHash: transaction.hash });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
