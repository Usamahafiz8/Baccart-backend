const { ethers } = require('ethers');
require('dotenv').config();
const infuraController = require('./infuraController');
const tokenAbi = require('../contractAbi/CCC.json');
const tokenAddress = process.env.CCC_CONTRACT_ADDRESS;

const getWalletBalance = async (address) => {
    const provider = infuraController.getInfuraProvider();
    const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, provider);

    try {
        // Fetch ETH balance
        const maticBalance = await provider.getBalance(address);
        // Fetch CCC token balance
        const balance = await tokenContract.balanceOf(address);

        return {
            MaticBalance: ethers.utils.formatEther(maticBalance),
            CCC_Token: balance.toString() / 100000000,
        };
    } catch (error) {
        console.error('Error fetching balance:', error);
        throw error;
    }
};

module.exports = {
    getWalletBalance,
};
