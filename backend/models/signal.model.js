const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Signal = sequelize.define("Signal", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  symbol: DataTypes.STRING,
  direction: DataTypes.ENUM("BUY", "SELL"),
  entry_price: DataTypes.FLOAT,
  stop_loss: DataTypes.FLOAT,
  target_price: DataTypes.FLOAT,
  entry_time: DataTypes.DATE,
  expiry_time: DataTypes.DATE,
  status: {
    type: DataTypes.ENUM("OPEN", "TARGET_HIT", "STOPLOSS_HIT", "EXPIRED"),
    defaultValue: "OPEN",
  },
  realized_roi: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
});

module.exports = Signal;