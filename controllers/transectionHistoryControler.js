const axios = require('axios');
const ethers = require('ethers');
require('dotenv').config();

const getTransactionsList = async (walletAddress, res) => {
  try {
    const apiKey = process.env.POLYGONSCAN_API_KEY;
    const apiUrl = `https://api.polygonscan.com/api`;
    const module = 'account';
    const action = 'txlist';
    const sort = 'desc';

    const response = await axios.get(apiUrl, {
      params: {
        module,
        action,
        address: walletAddress,
        sort,
        apikey: apiKey,
      },
    });

    if (response.data.status !== '1') {
      return res.status(500).json({
        success: false,
        message: 'Error fetching transactionsHistory.',
        error: response.data.message,
      });
    }

    const transactions = response.data.result.slice(0, 10);

    const formattedTransactions = transactions.map(async (tx) => {
      const txDetails = await axios.get(apiUrl, {
        params: {
          module: 'transaction',
          action: 'getstatus',
          txhash: tx.hash,
          apikey: apiKey,
        },
      });
    
      const status = txDetails.data.result.isError === '0' ? 'Success' : 'Failure';
    
      const gasUsed = ethers.BigNumber.from(tx.gasUsed);
      const gasPrice = ethers.BigNumber.from(tx.gasPrice);
    
      // Calculate fees in wei
      const feesWei = gasUsed.mul(gasPrice);
    
      // Convert fees to MATIC (1 MATIC = 10^18 wei)
      const feesMatic = ethers.utils.formatUnits(feesWei, 'ether');
    
      return {
        hash: tx.hash,
        from: tx.from,
        to: tx.to,
        value: ethers.utils.formatUnits(tx.value, 'wei'),
        timestamp: new Date(tx.timeStamp * 1000),
        status: status,
        senderAddress: tx.from,
        receiverAddress: tx.to,
        fees: feesMatic, // Fees in Matic
      };
    });
    
    const transactionsWithDetails = await Promise.all(formattedTransactions);
    
    

    res.json({ success: true, transactionsHistory: transactionsWithDetails });
  } catch (error) {
    console.error('Error fetching transactionsHistory:', error.message);
    res.status(500).json({ success: false, message: 'Error fetching transactionsHistory.', error: error.message });
  }
};

module.exports = {
  getTransactionsList,
};
