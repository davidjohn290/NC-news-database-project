const {
  fetchCommentById,
  deleteCommentById,
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

module.exports = { getCommentById, removeCommentById };
