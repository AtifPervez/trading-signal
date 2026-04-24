const axios = require('axios');

async function getLivePrice(symbol) {
    try {
        const res = await axios.get(
            `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
        );
        return parseFloat(res.data.price);
    } catch (err) {
        console.error("Binance error:", err.message);
        return null;
    }
}
function calculateROI(signal, currentPrice) {
    if (!currentPrice) return null;

    let roi;
    if (signal.direction === "BUY") {
        roi = ((currentPrice - signal.entry_price) / signal.entry_price) * 100;
    } else {
        roi = ((signal.entry_price - currentPrice) / signal.entry_price) * 100;
    }

    return parseFloat(roi.toFixed(2));
}
function evaluateSignal(signal, currentPrice) {
    if (signal.status !== "OPEN") return signal.status;

    const now = new Date();

    // Expiry check
    if (now > new Date(signal.expiry_time)) {
        return "EXPIRED";
    }

    if (!currentPrice) return "OPEN";

    if (signal.direction === "BUY") {
        if (currentPrice >= signal.target_price) return "TARGET_HIT";
        if (currentPrice <= signal.stop_loss) return "STOPLOSS_HIT";
    }

    if (signal.direction === "SELL") {
        if (currentPrice <= signal.target_price) return "TARGET_HIT";
        if (currentPrice >= signal.stop_loss) return "STOPLOSS_HIT";
    }

    return "OPEN";
}

module.exports = {
    getLivePrice,
    calculateROI,
    evaluateSignal,
}