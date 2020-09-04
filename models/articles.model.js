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
      if (res.length === 0) return Promise.reject({ msg: "Bad request" });
      else return res[0];
    });
};

const patchVotesById = (id, numberOfVotes) => {
  return knex("articles")
    .where("article_id", id)
    .increment("votes", numberOfVotes)
    .returning("*")
    .then((article) => {
      return article[0];
    });
};

const fetchAllCommentsById = (id, sort_by = "created_at", order = "desc") => {
  return knex
    .select("*")
    .from("comments")
    .where("article_id", id)
    .orderBy(sort_by, order)
    .then((res) => {
      if (res.length === 0) return Promise.reject({ status: 400 });
      else {
        const formattedArray = res.map((comment) => {
          delete comment.article_id;
          return comment;
        });
        return formattedArray;
      }
    });
};

const fetchAllArticles = (
  sort_by = "created_at",
  order_by = "desc",
  filter,
  topic
) => {
  console.log(topic);
  return knex
    .select("articles.*")
    .from("articles")
    .modify((query) => {
      const columnFilter = Object.keys(filter);
      if (
        !filter.hasOwnProperty("sort_by") &&
        !filter.hasOwnProperty("order") &&
        columnFilter.length === 1
      ) {
        query.where(`articles.${columnFilter[0]}`, filter[columnFilter]);
      }
      if (topic) {
        query.where("topic", topic);
      }
    })
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .orderBy(sort_by, order_by)
    .count("comments.article_id as comment_count")
    .then((res) => {
      const formattedArray = res.map((article) => {
        return article;
      });
      return formattedArray;
    });
};

module.exports = {
  fetchArticleById,
  patchVotesById,
  fetchAllCommentsById,
  fetchAllArticles,
};
