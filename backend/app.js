const express = require("express");
const cors = require("cors");
const sequelize=require("./models")

const app = express();
app.use(cors());
app.use(express.json());

const signalRoutes = require("./routes/signal.routes");
app.use("/", signalRoutes);



app.get("/", (req, res) => {
  res.send("API Running...");
});
sequelize.sync().then(() => {
  console.log("Database synced");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});