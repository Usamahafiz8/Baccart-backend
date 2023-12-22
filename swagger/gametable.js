// routes/gameTableRoutes.js
/**
 * @swagger
 * /game-table/create:
 *   post:
 *     summary: Create a new game table
 *     tags:
 *       - GameTable
 *     requestBody:
 *       description: Game table details
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GameTable'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               message: Table created successfully
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

/**
 * @swagger
 * /game-table/getAll:
 *   get:
 *     summary: Get all game tables
 *     tags:
 *       - GameTable
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               - table_ID: "1"
 *                 total_Investor_Seats: "10"
 *                 investor_Cer_Seats_Cost: "100"
 *                 winners_Rewards: "500"
 *                 bet_Size: "50"
 *                 Bankers_Address: "0x123456789"
 *               - table_ID: "2"
 *                 total_Investor_Seats: "8"
 *                 investor_Cer_Seats_Cost: "150"
 *                 winners_Rewards: "700"
 *                 bet_Size: "75"
 *                 Bankers_Address: "0x987654321"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
