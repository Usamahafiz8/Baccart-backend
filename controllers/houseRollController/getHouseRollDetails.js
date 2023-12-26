// controllers/houseRollController/getHouseRollDetails.js
const mongoose = require('mongoose');
const HouseRoll = require('../../model/investor');
const ContractGameTable = require('../../model/GameTable');
const Gamer = require('../../model/gamer');

const getHouseRollDetails = async (req, res) => {
  try {
    const { table_ID } = req.params; // Change to use URL parameter

    // Find the house roll based on the table ID
    const houseRoll = await ContractGameTable.findOne({ table_ID })
      .populate('table_ID')
      .populate({
        path: 'gamers',
        populate: { path: 'betInformation.table_ID' },
      });

    if (!houseRoll) {
      return res.status(404).json({ error: 'House Roll not found for the specified table' });
    }

    // Adjust the response structure as needed
    const response = {
      houseRoll: {
        _id: houseRoll._id,
        table_ID: houseRoll.table_ID,
        // Include other relevant house roll details here
        gamers: houseRoll.gamers.map((gamer) => ({
          _id: gamer._id,
          gamer_Address: gamer.gamer_Address,
          // Include other relevant gamer details here
          betInformation: {
            betOn: gamer.betInformation.betOn,
            table_ID: gamer.betInformation.table_ID,
            startDate: gamer.betInformation.startDate,
            // Add other relevant bet information fields here
          },
        })),
      },
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error getting house roll details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = getHouseRollDetails;
