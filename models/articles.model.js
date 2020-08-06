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

const postCommentById = (id, { username, body }) => {
  if (username === undefined || body === undefined) {
    return Promise.reject({
      status: 400,
      msg: "Missing details from send request",
    });
  } else {
    return knex("comments")
      .insert({ body: body, author: username, article_id: id })
      .where("article_id", id)
      .returning("*")
      .then((res) => {
        if (res.length === 0) return Promise.reject({ status: 400 });
        else return res[0];
      });
  }
};

const fetchAllCommentsById = (id, sort_by = "created_at", order = "desc") => {
  return knex
    .select("*")
    .from("comments")
    .where("article_id", id)
    .orderBy(sort_by, order)
    .then((res) => {
      console.log(res);
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
  filter
) => {
  return knex
    .select("articles.*")
    .from("articles")
    .modify((query) => {
      const columnFilter = Object.keys(filter)[0];
      const rowFilter = filter[columnFilter];
      if (Object.keys(filter).length === 1)
        query.where(`articles.${columnFilter}`, rowFilter);
    })
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .orderBy(sort_by, order_by)
    .count("comments.article_id as comment_count")
    .then((res) => {
      const formattedArray = res.map((article) => {
        delete article.body;
        return article;
      });
      return formattedArray;
    });
};

module.exports = {
  fetchArticleById,
  patchVotesById,
  postCommentById,
  fetchAllCommentsById,
  fetchAllArticles,
};
