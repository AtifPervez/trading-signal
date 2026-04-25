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
    if (currentPrice === null || currentPrice === undefined) return null;

    const entry = Number(signal.entry_price);
    if (!entry) return null;

    let roi = 0;

    if (signal.direction === "BUY") {
        roi = ((currentPrice - entry) / entry) * 100;
    }

    if (signal.direction === "SELL") {
        roi = ((entry - currentPrice) / entry) * 100;
    }

    return parseFloat(roi.toFixed(2));
}

const FINAL_STATES = ["TARGET_HIT", "STOPLOSS_HIT", "EXPIRED"];

function evaluateSignal(signal, currentPrice) {
   
    if (FINAL_STATES.includes(signal.status)) {
        return signal.status;
    }

    const now = new Date();

    
    if (signal.expiry_time && new Date(signal.expiry_time) <= now) {
        return "EXPIRED";
    }

    
    if (currentPrice === null || currentPrice === undefined) {
        return "OPEN";
    }

    
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