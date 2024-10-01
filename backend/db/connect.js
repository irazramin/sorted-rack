const mongoose = require("mongoose");

const connDb = (url) => {
  return mongoose.connect(url, { useUnifiedTopology: true });
};

module.exports = connDb;
