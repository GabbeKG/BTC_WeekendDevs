const express = require("express");
const router = express.Router();
const { users, generateNextId } = require("../data/users");


let currentSession = null; // This will hold the current logged-in user session


router.post("/register", (req, res) => {
    const { username, password, role } = req.body;
   if (!username || !password || !["student", "company"].includes(role)) {
    return res.status(400).json({ success: false, message: "Invalid data" });
  }

  if (users.find((u) => u.username === username)) {
    return res.status(409).json({ success: false, message: "Username taken" });
  }

  const newUser = {
    id: generateNextId(role),
    username,
    password,
    role,
  };

  users.push(newUser);
  currentSession = newUser;

  res.json({ success: true, user: newUser });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    currentSession = user;
    res.json({ success: true, user });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

router.post("/logout", (req, res) => {
  currentSession = null;
  res.json({ success: true });
});

router.get("/me", (req, res) => {
  res.json({ user: currentSession });
});

module.exports = router;
