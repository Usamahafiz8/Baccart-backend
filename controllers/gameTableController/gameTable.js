// controllers/gameTableController.js
const ContractGameTable = require("../../model/GameTable");
const Gamer = require("../../model/gamer");

const getGameTableDetails = async (req, res) => {
  try {
    const { table_ID } = req.params;

    // Find the game table by table_ID and populate the 'gamers' field
    const gameTable = await ContractGameTable.findOne({ _id: table_ID }).populate("gamers");

    if (!gameTable) {
      return res.status(404).json({ error: "Game table not found" });
    }

    // Extract gamer details from the populated 'gamers' field
    const gamerDetails = gameTable.gamers.map((gamer) => ({
      _id: gamer._id,
      gamer_Address: gamer.gamer_Address,
      result: gamer.betInformation.win_or_lose,
      betOn: gamer.betInformation.betOn,
      startTime:gamer.betInformation.startDate,
      EndTime:gamer.betInformation.endDate,
    }));

    // Calculate count of winners and losers
    const winnersCount = gameTable.gamers.filter((gamer) => gamer.betInformation.win_or_lose === 'win').length;
    const losersCount = gameTable.gamers.filter((gamer) => gamer.betInformation.win_or_lose === 'lose').length;

    // You can customize the response format based on your requirements
    const gameTableDetails = {
      table_ID: gameTable.table_ID,
      total_Investor_Seats: gameTable.total_Investor_Seats,
      per_Share_Cost: gameTable.per_Share_Cost,
      winners_Rewards: gameTable.winners_Rewards,
      bet_Size: gameTable.bet_Size,
      Bankers_Address: gameTable.Bankers_Address,
      gamers: gamerDetails,
      investors: gameTable.investors,
      winnersCount,
      losersCount,
      Region:gameTable.Region
    };

    res.status(200).json({ success: true, gameTable: gameTableDetails });
  } catch (error) {
    console.error("Error getting game table details:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getAllGameTableDetails = async (req, res) => {
  try {
    // Find all game tables and populate the 'gamers' field for each table
    const allGameTables = await ContractGameTable.find().populate('gamers');

    if (!allGameTables || allGameTables.length === 0) {
      return res.status(404).json({ error: 'No game tables found' });
    }

    // Extract details for each game table
    const allGameTableDetails = await Promise.all(allGameTables.map(async (gameTable) => {
      // Extract gamer details from the populated 'gamers' field
      const gamerDetails = gameTable.gamers.map((gamer) => ({
        _id: gamer._id,
        gamer_Address: gamer.gamer_Address,
        result: gamer.betInformation.win_or_lose,
        betOn: gamer.betInformation.betOn,
        startTime:gamer.betInformation.startDate,
        EndTime:gamer.betInformation.endDate,
      }));

      // Calculate count of winners and losers
      const winnersCount = gameTable.gamers.filter((gamer) => gamer.betInformation.win_or_lose === 'win').length;
      const losersCount = gameTable.gamers.filter((gamer) => gamer.betInformation.win_or_lose === 'lose').length;

      // Return details for the current game table
      return {
        _ID: gameTable._id,
        table_ID: gameTable.table_ID,
        total_Investor_Seats: gameTable.total_Investor_Seats,
        per_Share_Cost: gameTable.per_Share_Cost,
        winners_Rewards: gameTable.winners_Rewards,
        bet_Size: gameTable.bet_Size,
        Bankers_Address: gameTable.Bankers_Address,
        gamers: gamerDetails,
        investors: gameTable.investors,
        winnersCount,
        losersCount,
        Region:gameTable.Region
         
      };
    }));

    res.status(200).json({ success: true, allGameTables: allGameTableDetails });
  } catch (error) {
    console.error('Error getting all game table details:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = { getGameTableDetails, getAllGameTableDetails };
