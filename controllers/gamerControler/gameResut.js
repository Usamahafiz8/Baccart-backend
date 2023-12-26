// controllers/gamerController/checkWin.js
const mongoose = require('mongoose');
const Gamer = require('../../model/gamer');
const ContractGameTable = require('../../model/GameTable');

const checkWin = async (req, res) => {
  try {
    const { gamer_Address, _id, table_ID, result } = req.body;

    // Find the gamer based on address, _id, and table_ID
    const gamer = await Gamer.findOne({ gamer_Address, _id, 'betInformation.table_ID': table_ID });

    if (!gamer) {
      return res.status(404).json({ error: 'Gamer not found' });
    }

    // Find the corresponding game table
    const gameTable = await ContractGameTable.findById(table_ID);

    if (!gameTable) {
      return res.status(404).json({ error: 'Game table not found' });
    }

    // Update the win_or_lose field and set the end date based on user input
    gamer.betInformation.win_or_lose = result; // 'win', 'lose', or 'tie'
    gamer.betInformation.endDate = Date.now();
    await gamer.save();

    res.status(200).json({ message: `Gamer result updated: ${result}` });
  } catch (error) {
    console.error('Error checking win:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = checkWin;
