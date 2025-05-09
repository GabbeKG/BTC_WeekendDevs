const express = require('express');
const cors = require('cors');

const achievements = require('./data/achievements'); // <-- import the module
const users = require('./data/users');               // optional if needed
const nav = require('./routes/nav');                   // optional if needed

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Route to get achievements
app.get("/api/achievements", (req, res) => {
  res.json(achievements);
});

// (Optional) Route to view users or nav if you want
app.get("/api/users", (req, res) => {
  res.json(users);
});

app.get("/api/nav", (req, res) => {
  res.json(nav);
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
