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

const getAllGameTables = async (req, res) => {
  try {
    const gameTables = await ContractGameTable.find()
      .populate('gamers') // Populate gamers data
      .populate('investors'); // Populate investors data
    res.status(200).json(gameTables);
  } catch (error) {
    console.error("Error retrieving game tables:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const listGameTables = async (req, res) => {
  try {
    // Fetch all game tables
    const gameTables = await ContractGameTable.find();

    // Extract relevant information for each game table
    const formattedGameTables = await Promise.all(gameTables.map(async (table) => {
      // Calculate count of winners and losers
      const winnersCount = await Gamer.countDocuments({ 'betInformation.table_ID': table._id, 'betInformation.win_or_lose': 'win' });
      const losersCount = await Gamer.countDocuments({ 'betInformation.table_ID': table._id, 'betInformation.win_or_lose': 'loss' });

      return {
        table_ID: table._id,
        total_Investor_Seats: table.total_Investor_Seats,
        invest_Cer_Seats_Cost: table.invest_Cer_Seats_Cost,
        winners_Rewards: table.winners_Rewards,
        investor_Cer_Seats_Cost: table.investor_Cer_Seats_Cost,
        winners_Rewards: table.winners_Rewards,
        bet_Size: table.bet_Size,
        gamers: table.gamers,
        investors: table.investors,
        winnersCount,
        losersCount
      };
    }));

    res.status(200).json({ success: true, gameTables: formattedGameTables });
  } catch (error) {
    console.error('Error listing game tables:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = {
  createGameTable,
  getAllGameTables,
  listGameTables
};
