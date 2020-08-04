const knex = require("../db/connection");

const fetchAllTopics = () => {
  return knex
    .select("*")
    .from("topics")
    .then((res) => {
      return res;
    });
};

module.exports = { fetchAllTopics };
