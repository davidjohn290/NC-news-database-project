const knex = require("../db/connection");

const fetchCommentById = (id, numberOfVotes) => {
  return knex
    .select("*")
    .from("comments")
    .where("comment_id", id)
    .update("votes", numberOfVotes)
    .returning("*")
    .then((res) => {
      console.log(res);
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

module.exports = { fetchCommentById, deleteCommentById };
