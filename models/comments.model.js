const knex = require("../db/connection");

const fetchCommentById = (id, numberOfVotes) => {
  return knex
    .select("*")
    .from("comments")
    .where("comment_id", id)
    .increment("votes", numberOfVotes)
    .returning("*")
    .then((res) => {
      if (res.length === 0)
        return Promise.reject({ status: 400, msg: "Bad request" });
      else return res[0];
    });
};

const deleteCommentById = (id) => {
  return knex
    .select("*")
    .from("comments")
    .where("comment_id", id)
    .del()
    .then((res) => {
      if (res === 0)
        return Promise.reject({ status: 404, msg: "Comment_id not found" });
    });
};

const postCommentById = (id, { username, body }) => {
  return knex("comments")
    .insert({ body: body, author: username, article_id: id })
    .where("article_id", id)
    .returning("*")
    .then((res) => {
      if (res.length === 0) return Promise.reject({ status: 400 });
      else return res[0];
    });
};

module.exports = { fetchCommentById, deleteCommentById, postCommentById };
