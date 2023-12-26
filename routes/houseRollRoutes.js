
const express = require('express');
const router = express.Router();
const getHouseRollDetails = require('../controllers/houseRollController/getHouseRollDetails');

// Route for getting house roll details
router.get("/houseRollDetails/:table_ID", (req, res) => {
  try {
    // Extract necessary data from the URL parameter
    const { table_ID } = req.params;

    // Call the controller function
    getHouseRollDetails(req, res, { table_ID });
  } catch (error) {
    console.error("Error getting house roll details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
