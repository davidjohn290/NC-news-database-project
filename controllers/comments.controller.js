const {
  fetchCommentById,
  deleteCommentById,
  postCommentById,
} = require("../models/comments.model");

const getCommentById = (req, res, next) => {
  const {
    params: { comment_id },
  } = req;
  const {
    body: { inc_votes },
  } = req;

  fetchCommentById(comment_id, inc_votes)
    .then((comment) => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

const removeCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  deleteCommentById(comment_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
};

const addComment = (req, res, next) => {
  const { params, body } = req;
  postCommentById(params.article_id, body)
    .then((comment) => {
      res.status(201).send({ postedComment: comment });
    })
    .catch(next);
};

module.exports = { getCommentById, removeCommentById, addComment };
