// data/users.js

const users = [
  {
    id: "s1",
    username: "student1",
    password: "test123",
    role: "student",
  },
  {
    id: "c1",
    username: "company1",
    password: "company123",
    role: "company",
  },
];

// Utility to get next ID based on role
function generateNextId(role) {
  const prefix = role === "student" ? "s" : "c";
  const filtered = users.filter((u) => u.role === role);
  const maxNumber = filtered
    .map((u) => parseInt(u.id.slice(1)))
    .reduce((a, b) => Math.max(a, b), 0);

  return prefix + (maxNumber + 1);
}

module.exports = {
  users,
  generateNextId,
};
