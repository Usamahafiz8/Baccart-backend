// controllers/gameTableController.js
const ContractGameTable = require("../../model/GameTable");
const Gamer = require("../../model/gamer");
const Investor = require("../../model/investor");

const createGameTable = async (req, res) => {
  try {
    const {
      table_ID,
      total_Investor_Seats,
      investor_Cer_Seats_Cost,
      winners_Rewards,
      bet_Size,
      Bankers_Address,
    } = req.body;

    const newGameTable = new ContractGameTable({
      table_ID,
      total_Investor_Seats,
      investor_Cer_Seats_Cost,
      winners_Rewards,
      bet_Size,
      Bankers_Address,
    });

    await newGameTable.save();

    res.status(201).json({ message: "Game table created successfully!" });
  } catch (error) {
    console.error("Error creating game table:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {
  createGameTable,
};
