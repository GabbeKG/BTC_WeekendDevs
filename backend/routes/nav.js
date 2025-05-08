const express = require("express");
const router = express.Router();
const session = require("../routes/auth");

const getNavItems = (user) => {
  const baseNav = [
    { label: "Start", href: "/" },
    { label: "Om oss", href: "/om-oss" }
  ];

  if (!user) {
    baseNav.push({ label: "Logga in", href: "/logga-in" });
    baseNav.push({ label: "Registrera", href: "/registrera" });
  } else {
    baseNav.push({ label: user.username, href: "/profil" });
    baseNav.push({ label: "Logga ut", href: "/logga-ut" });
  }

  return baseNav;
};

router.get("/", (req, res) => {
 
  const currentUser = require("./auth").currentSession;
  res.json(getNavItems(currentUser));
});

module.exports = router;
