const express = require('express');
const router = express.Router();
const investorController = require('../controllers/investorControler/investorTablesRecords');

// Define the route for buying table shares
router.post('/buy-table-shares', investorController.buyTableShares);

module.exports = router;
