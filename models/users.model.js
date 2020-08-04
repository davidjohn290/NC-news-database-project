const knex = require("../db/connection");

const fetchUserByUsername = (username) => {
  return knex
    .select("*")
    .from("users")
    .where("username", username)
    .then((user) => {
      const error = { status: 400, msg: "Bad request" };
      if (user.length === 0) return Promise.reject(error);
      else return user[0];
    });
};

module.exports = { fetchUserByUsername };
