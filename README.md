# 📊 Trading Signal Tracking Application 🚀

## 📌 Overview
This is a full-stack trading signal tracking system built using **Node.js, Express, React, and Sequelize (SQLite)**.

It allows users to create trading signals and track them in real-time using live market data from the **Binance Public API**.

The system automatically evaluates signal performance based on:
- Price movement
- Stop loss
- Target price
- Expiry rules

---
## ⚙️ Backend Setup
- cd trading-signal/backend
- npm install
- npm start

API Endpoints
- Base URL: http://localhost:5000/api
- Create Signal:POST /api/signals
- Get All Signals:GET /api/signals
- Get Signal By ID:GET /api/signals/:id
- Delete Signal By ID:DELETE /api/signals/:id
- Signal Status:GET /api/signals/:id/status

💻 Frontend Setup
- cd trading-signal/frontend
- npm install
- npm start
- Frontend Runs On:http://localhost:3000

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- Sequelize ORM
- SQLite Database
- Axios (for Binance API integration)

### Frontend
- React.js (Create React App)
- Axios
- Basic CSS (Custom UI)

---



