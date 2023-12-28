const Table = require("../../model/GameTable"); 
const Investor = require("../../model/investor");

const buyShares = async (req, res) => {
  try {
    const { tableId, sharesToBuy, investorAddress } = req.body;

    // Perform input validation
    if (!tableId || !sharesToBuy || !investorAddress) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    // Retrieve the table from the database
    const table = await Table.findById(tableId);

    // Check if the table is open and has enough remaining shares
    if (
      !table ||
      table.status !== "active" ||
      table.Remaining_Shares < sharesToBuy
    ) {
      return res
        .status(400)
        .json({ error: "Invalid table or insufficient shares" });
    }

    // Calculate the total cost for the investor
    const totalCost = sharesToBuy * table.per_Share_Cost;

    // Check if the investor has enough balance (assuming balance is stored in the Investor model)
    const investor = await Investor.findOne({ address: investorAddress });
    if (!investor || investor.balance < totalCost) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    // Update the table and investor records
    table.Remaining_Shares -= sharesToBuy;
    investor.balance -= totalCost;

    // Save the changes to the database
    await table.save();
    await investor.save();

    // You can return additional data or success message as needed
    res
      .status(200)
      .json({
        message: "Shares bought successfully!",
        remainingShares: table.Remaining_Shares,
      });
  } catch (error) {
    console.error("Error buying table shares:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = buyShares;
