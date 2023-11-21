const express = require('express');
const TokenTransferController = require('../controllers/transection');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: API for handling token transactions
 */

/**
 * @swagger
 * /transactions/transferTokens:
 *   post:
 *     summary: Transfer CCC tokens
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               privateKey:
 *                 type: string
 *                 description: privateKey phrase of the wallet
 *               recipientAddress:
 *                 type: string
 *                 description: Address to receive CCC tokens
 *               cccAmountToSend:
 *                 type: string
 *                 description: Amount of CCC tokens to send (in smallest unit)
 *     responses:
 *       200:
 *         description: Token transfer successful
 *       400:
 *         description: Bad request. Check the request payload.
 *       500:
 *         description: Internal server error.
 */
router.post('/transferTokens', (req, res) => {
  const { privateKey, recipientAddress, cccAmountToSend } = req.body;

  try {
    const infuraApiKey = "b1f33be1c1844b388461c085b20c0ef9";
    const tokenAddress = "0x0c39c858f0F83c6DfFe5567828eAf85A060dd140";

    const tokenController = new TokenTransferController(
      privateKey,
      recipientAddress,
      cccAmountToSend,
      tokenAddress,
      infuraApiKey
    );

    tokenController.transferTokensAPI(req, res);
  } catch (error) {
    console.error("Error transferring CCC tokens:", error.message);
    res.status(500).json({ success: false, message: 'Error transferring tokens.', error: error.message });
  }
});

module.exports = router;


