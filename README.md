*****Backend Setup*********
cd trading-signal/backend
npm install
npm start
Backend will run on:http://localhost:5000
baseURL: "http://localhost:5000/api"

*******API Endpoints (Backend)***********
1.Create Signal
POST (http://localhost:5000/api/signals)

2.Get Signal
GET (http://localhost:5000/api/signals)

3.Get Signal By id
GET (http://localhost:5000/api/signals/:id)

4.Delete Signal By Id
DELETE (http://localhost:5000/api/signals/:id)

5.Signal Status
http://localhost:5000/api/signals/:id/status

***********Frontend Setup***************

cd trading-signal/frontend
npm install
npm start
Frontend will run on:http://localhost:3000




📊 Trading Signal Tracking Application
🚀 Overview

This is a full-stack trading signal tracking system built using Node.js, Express, React, and Sequelize (SQLite).
It allows users to create trading signals and track them in real-time using live market data from the Binance Public API.

The system automatically evaluates signal performance based on price movement, stop loss, target, and expiry rules.


******************TECH STACK*********************
Backend
  -Node.js
  -Express.js
  -Sequelize ORM
  -SQLite Database
  -Axios (for Binance API)
Frontend
  -React.js (Create React App)
  -Axios
  -Basic CSS (Custom UI)

*******PROJECT STRUCTURE**********
  project-root/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── app.js
│   └── index.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.js
│
└── README.md



