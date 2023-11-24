const express = require('express');
const CCCTokenTransferController = require('../controllers/transectionControler/cccTransferControler');
const USDTTransferController = require('../controllers/transectionControler/usdtTransferControler'); 
const MaticTransferController = require('../controllers/transectionControler/maticTransferControler');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: API for handling token transactions
 */

/**
 * @swagger
 * /transactions/transferTokensCCC:
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
 *               amountToSend:
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
router.post('/transferTokensCCC', (req, res) => {
  const { privateKey, recipientAddress, amountToSend } = req.body;

  try {
    const infuraApiKey = "b1f33be1c1844b388461c085b20c0ef9";
    const CCCAddress = "0x0c39c858f0F83c6DfFe5567828eAf85A060dd140";

    const tokenController = new CCCTokenTransferController(
      privateKey,
      recipientAddress,
      amountToSend,
      CCCAddress,
      infuraApiKey
    );

    tokenController.transferTokensAPI(req, res);
  } catch (error) {
    console.error("Error transferring CCC tokens:", error.message);
    res.status(500).json({ success: false, message: 'Error transferring CCC tokens.', error: error.message });
  }
});

/**
 * @swagger
 * /transactions/transferTokensUSDT:
 *   post:
 *     summary: Transfer USDT tokens
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
 *                 description: Address to receive USDT tokens
 *               amountToSend:
 *                 type: string
 *                 description: Amount of USDT tokens to send
 *     responses:
 *       200:
 *         description: Token transfer successful
 *       400:
 *         description: Bad request. Check the request payload.
 *       500:
 *         description: Internal server error.
 */
router.post('/transferTokensUSDT', (req, res) => {
  const { privateKey, recipientAddress, amountToSend } = req.body;

  try {
    const infuraApiKey = "b1f33be1c1844b388461c085b20c0ef9";
    const USDTAddress = "0xYourUSDTContractAddress"; // Replace with the actual address of the USDT contract

    const usdtController = new USDTTransferController(
      privateKey,
      recipientAddress,
      amountToSend,
      USDTAddress,
      infuraApiKey
    );

    usdtController.transferTokensAPI(req, res);
  } catch (error) {
    console.error("Error transferring USDT tokens:", error.message);
    res.status(500).json({ success: false, message: 'Error transferring USDT tokens.', error: error.message });
  }
});

/**
 * @swagger
 * /transactions/transferMATIC:
 *   post:
 *     summary: Transfer MATIC tokens
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
 *                 description: Address to receive MATIC tokens
 *               amountToSend:
 *                 type: string
 *                 description: Amount of MATIC to send
 *     responses:
 *       200:
 *         description: Token transfer successful
 *       400:
 *         description: Bad request. Check the request payload.
 *       500:
 *         description: Internal server error.
 */
router.post('/transferMATIC', (req, res) => {
  const { privateKey, recipientAddress, amountToSend } = req.body;

  try {
    const maticController = new MaticTransferController(
      privateKey,
      recipientAddress,
      amountToSend
    );

    maticController.transferMatic(req, res);

  } catch (error) {
    console.error("Error transferring MATIC:", error.message);
    res.status(500).json({ success: false, message: 'Error transferring MATIC.', error: error.message });
  }
});

module.exports = router;
