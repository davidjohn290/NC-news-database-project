const { fetchUserByUsername } = require("../models/users.model");

const getUserByUsername = (req, res, next) => {
  const { params } = req;
  fetchUserByUsername(params.username)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch(next);
};

module.exports = { getUserByUsername };
