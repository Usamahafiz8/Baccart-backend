const express = require('express');
const { getTransactionsList } = require('../controllers/transectionHistoryControler'); // Import the correct function

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: TransactionsHistory
 *   description: API for handling token transactionsHistory
 */

/**
 * @swagger
 * /transactionsHistory/{walletAddress}:
 *   get:
 *     summary: Get list of transactionsHistory on the Polygon (Matic) chain for a wallet
 *     tags: [TransactionsHistory]
 *     parameters:
 *       - in: path
 *         name: walletAddress
 *         schema:
 *           type: string
 *         required: true
 *         description: The wallet address to fetch transactionsHistory for
 *     responses:
 *       200:
 *         description: List of transactionsHistory fetched successfully
 *       400:
 *         description: Bad request. Check the request parameters.
 *       500:
 *         description: Internal server error.
 */
router.get('/:walletAddress', async (req, res) => {
  const { walletAddress } = req.params;

  if (!walletAddress) {
    return res.status(400).json({ success: false, message: 'Wallet address is required.' });
  }

  try {
    await getTransactionsList(walletAddress, res); // Use the correct function name
  } catch (error) {
    console.error("Error fetching Polygon transactionsHistory:", error.message);
    res.status(500).json({ success: false, message: 'Error fetching Polygon transactionsHistory.', error: error.message });
  }
});

module.exports = router;
