const endpoints = require("../endpoints.json");

const endpointsJSON = (req, res, next) => {
  res.status(200).send({ endpoints });
};

module.exports = endpointsJSON;
