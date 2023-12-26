// routes/gameTableRoutes.js
const express = require("express");
const router = express.Router();
const gameTableController = require("../../controllers/gameTableController/index");

router.post("/create", gameTableController.createGameTable);
router.get("/getAll", gameTableController.getAllGameTables);
router.get('/listGameTables', gameTableController.listGameTables);


module.exports = router;
