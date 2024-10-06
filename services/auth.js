const jwt = require("jsonwebtoken");
const secret = "dev123@#";

function setUser(user) {
  return jwt.sign({ _id: user.id, email: user.email, name: user.name }, secret);
}

function getUser(token) {
  if (!token) return null;
  if (token) {
    const user = jwt.verify(token, secret);
    return user;
  }
}

module.exports = { getUser, setUser };
