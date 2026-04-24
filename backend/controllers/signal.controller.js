const Signal = require("../models/signal.model");
const {
  getLivePrice,
  calculateROI,
  evaluateSignal,
} = require("../services/signal.services");

exports.createSignal = async (req, res) => {
  try {
    const {
      symbol,
      direction,
      entry_price,
      stop_loss,
      target_price,
      entry_time,
      expiry_time,
    } = req.body;


    if (direction === "BUY") {
      if (stop_loss >= entry_price)
        return res.status(400).json({ error: "Stop loss must be less than entry price" });

      if (target_price <= entry_price)
        return res.status(400).json({ error: "Target must be greater than entry price" });
    }

    if (direction === "SELL") {
      if (stop_loss <= entry_price)
        return res.status(400).json({ error: "Stop loss must be greater than entry price" });

      if (target_price >= entry_price)
        return res.status(400).json({ error: "Target must be less than entry price" });
    }

    const now = new Date()
    const entryTime = new Date(entry_time)
    const diffHours = (now - entryTime) / (1000 * 60 * 60);

    if (diffHours > 24) {
      return res.status(400).json({
        error: "Entry time cannot be more than 24 hours in the past",
      });
    }

    if (new Date(expiry_time) <= new Date(entry_time)) {
      return res.status(400).json({ error: "Expiry must be after entry time" });
    }


    const signal = await Signal.create(req.body);

    res.status(201).json(signal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSignals = async (req, res) => {
  try {
    const signals = await Signal.findAll();
    const count = await Signal.count()

    const result = [];

    for (let signal of signals) {
      const currentPrice = await getLivePrice(signal.symbol);

      const newStatus = evaluateSignal(signal, currentPrice);
      const roi = calculateROI(signal, currentPrice);


      if (signal.status === "OPEN" && newStatus !== "OPEN") {
        signal.status = newStatus;
        signal.realized_roi = roi;
        await signal.save();
      }

      result.push({
        ...signal.toJSON(),
        current_price: currentPrice,
        roi,
      });
    }
    

      res.status(200).json({ totalData: count, data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getSignalById = async (req, res) => {
  try {
    const { id } = req.params;

    const signal = await Signal.findByPk(id);

    if (!signal) {
      return res.status(404).json({ error: "Signal not found" });
    }

    const currentPrice = await getLivePrice(signal.symbol);
    const status = evaluateSignal(signal, currentPrice);
    const roi = calculateROI(signal, currentPrice);

    res.status(200).json({
      ...signal.toJSON(),
      current_price: currentPrice,
      status,
      roi,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteSignal = async (req, res) => {
  try {
    const { id } = req.params;

    const signal = await Signal.findByPk(id);

    if (!signal) {
      return res.status(404).json({ error: "Signal not found" });
    }

    await signal.destroy();

    res.json({ message: "Signal deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSignalStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const signal = await Signal.findByPk(id);

    if (!signal) {
      return res.status(404).json({ error: "Signal not found" });
    }

    const currentPrice = await getLivePrice(signal.symbol);
    const status = evaluateSignal(signal, currentPrice);
    const roi = calculateROI(signal, currentPrice);

    // 🔥 Persist only if OPEN → final
    if (signal.status === "OPEN" && status !== "OPEN") {
      signal.status = status;
      signal.realized_roi = roi;
      await signal.save();
    }

    res.json({
      id: signal.id,
      current_price: currentPrice,
      status,
      roi,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
