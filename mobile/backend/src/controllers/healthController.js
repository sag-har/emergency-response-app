const healthCheck = (req, res) => {
  res.status(200).json({
    success: true,
    data: null,
    message: "API Running Successfully",
  });
};

module.exports = {
  healthCheck,
};
