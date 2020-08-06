const knex = require("../db/connection");

const fetchAllTopics = () => {
  return knex.select("*").from("topics");
};

module.exports = { fetchAllTopics };
