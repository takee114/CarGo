const driver = (req, res, next) => {
  if (req.user && req.user.role === "driver") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as a driver" });
  }
};

module.exports = { driver };
