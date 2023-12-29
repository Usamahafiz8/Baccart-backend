const Table = require("../../model/GameTable");
const Investor = require("../../model/investor");
const ethers = require("ethers");

const usdtAbi = require('../../contractAbi/USDT.json');
const usdtContractAddress = process.env.USDT_CONTRACT_ADDRESS;
const infuraUrl = `https://polygon-mainnet.infura.io/v3/b1f33be1c1844b388461c085b20c0ef9`;

const buyShares = async (req, res) => {
  try {
    const { tableId, sharesToBuy, investorAddress, private_Key } = req.body;

    // Perform input validation
    if (!tableId || !sharesToBuy || !investorAddress) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    // Retrieve the table from the database
    const table = await Table.findById(tableId);

    // Check if the table is open and has enough remaining shares
    // if (!table || table.status !== "active" || table.Remaining_Shares < sharesToBuy) {
    //   return res.status(400).json({ error: "Invalid table or insufficient shares" });
    // }

    // Calculate the total cost for the investor
    const totalCost = sharesToBuy * table.per_Share_Cost;

    const provider = new ethers.providers.JsonRpcProvider(infuraUrl);

    // Connect to the USDT contract
    const wallet = new ethers.Wallet(private_Key, provider);
    const usdtContract = new ethers.Contract(usdtContractAddress, usdtAbi, wallet);

    // Check the USDT balance of the investor's address
    const usdtBalance = await usdtContract.balanceOf(investorAddress);

    // Convert the balance to a readable format (USDT has 6 decimals)
    const formattedUsdtBalance = ethers.utils.formatUnits(usdtBalance, 6);

    // Compare the USDT balance with the total cost
    if (formattedUsdtBalance < totalCost) {
      return res.status(400).json({ error: "Insufficient USDT balance" });
    }

    // Update the table and investor records
    table.Remaining_Shares -= sharesToBuy;

    // Save the changes to the database
    await table.save();

    // Check if the investor already exists in the Investor model
    let investor = await Investor.findOne({ address: investorAddress });

    // If the investor doesn't exist, create a new record
    if (!investor) {
        investor = new Investor({
          address: investorAddress,
          investor_Shares: 0,
          per_Share_Cost: 0,
          total_investment: 0,
        //   Add other fields as needed
        });
    }
      

    // Update the investor's share information
    const existingShares = investor.shares.find(share => share.tableId === tableId);

    if (existingShares) {
      // If the investor already has shares in this table, update the quantity
      existingShares.quantity += sharesToBuy;
    } else {
      // If the investor doesn't have shares in this table, add a new entry
      investor.shares.push({
        tableId: tableId,
        quantity: sharesToBuy,
      });
    }

    // Save the changes to the investor record
    await investor.save();

    // You can return additional data or a success message as needed
    res.status(200).json({
      message: "Shares bought successfully!",
      remainingShares: table.Remaining_Shares,
      investorBalance: formattedUsdtBalance,
    });
  } catch (error) {
    console.error("Error buying table shares:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = buyShares;
