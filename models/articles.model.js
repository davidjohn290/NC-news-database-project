const knex = require("../db/connection");

const fetchArticleById = (id) => {
  return knex
    .select("articles.*")
    .from("articles")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .where("articles.article_id", id)
    .count("comments.article_id as comment_count")
    .then((res) => {
      if (res.length === 0) return Promise.reject({ status: 400 });
      else return res[0];
    });
};

const patchVotesById = (id, numberOfVotes) => {
  return knex("articles")
    .update("votes", numberOfVotes)
    .where("article_id", id)
    .returning("*")
    .then((article) => {
      return article[0];
    });
};

module.exports = { fetchArticleById, patchVotesById };
