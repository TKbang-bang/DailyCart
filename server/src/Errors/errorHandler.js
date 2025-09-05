const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    about: err.about,
    message: err.message || "Internal server error",
  });
};

module.exports = errorHandler;
