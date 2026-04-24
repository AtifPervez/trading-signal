const express = require("express");
const router = express.Router();
const controller = require("../controllers/signal.controller");
const services=require('../services/signal.services')

router.post("/api/signals", controller.createSignal);
router.get("/api/signals",controller.getSignals)
router.get("/api/signals/:id", controller.getSignalById);
router.get("/api/signals/:id", controller.getSignalById);
router.delete("/api/signals/:id", controller.deleteSignal);
router.get("/api/signals/:id/status", controller.getSignalStatus);

module.exports = router;