const errorChecker = (error, req, res) => {
  if (error.code === 11000) {
    return res.render("alert", {
      user: req.user,
      stts: false,
      msg: "The value already exisits.",
    });
  } else {
    return res.render("alert", {
      user: req.user,
      stts: false,
      msg: "Something went wrong, try again.",
    });
  }
};

module.exports = { errorChecker };
