// routes/gameTableRoutes.js
const express = require("express");
const router = express.Router();
const gameTableController = require("../../controllers/gameTableController/index");
const getGameTableDetails = require("../../controllers/gameTableController/gameTable")

router.post("/create", gameTableController.createGameTable);
router.get("/getAll", gameTableController.getAllGameTables);
router.get('/listGameTables', gameTableController.listGameTables);
router.get('/getDetails/:table_ID', getGameTableDetails);




module.exports = router;
