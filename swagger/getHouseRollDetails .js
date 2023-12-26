/**
 * @swagger
 * tags:
 *   name: House Roll
 *   description: API for handling house roll details
 */

/**
 * @swagger
 * /houseRoll/houseRollDetails/{table_ID}:
 *   get:
 *     summary: Get house roll details for a specific table
 *     tags: [House Roll]
 *     parameters:
 *       - in: path
 *         name: table_ID
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the table to fetch house roll details for
 *     responses:
 *       200:
 *         description: House roll details fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "House roll details fetched successfully."
 *                 houseRoll:
 *                   type: object
 *                   example: 
 *                     // Include relevant house roll details here
 *       404:
 *         description: Table not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Table not found."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error fetching house roll details."
 *                 error:
 *                   type: string
 *                   example: "Internal server error message."
 */
