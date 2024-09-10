const client = (req, res, next) => {
  if (req.user && req.user.role === "client") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as a client" });
  }
};

module.exports = { client };
