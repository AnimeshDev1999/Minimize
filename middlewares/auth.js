const { getUser } = require("../services/auth");

function checkAuth(req, res, next) {
  const token = req.cookies?.token;
  req.user = null;
  if (!token) {
    return next();
  }
  const user = getUser(token);
  req.user = user;
  return next();
}

module.exports = { checkAuth };
